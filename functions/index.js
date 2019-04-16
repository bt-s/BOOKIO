const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});
const geolib = require('geolib');
const axios = require('axios');

admin.initializeApp();

const database = admin.firestore().collection('books');

exports.helloWorld = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    res.send('Hello from Firebase!');
  });
});

exports.fetchTitleSuggestion = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    if (req.method !== 'GET') {
      return res.status(404).json({
        message: 'Not allowed'
      });
    }

    axios({
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      url: `https://www.goodreads.com/book/auto_complete?format=json&q=${
        req.query.filter
      }`
    })
      .then(result => {
        return res.status(200).json(result.data);
      })
      .catch(err => {
        return res.status(err.code).json({
          message: `Cannot fetch data from API. ${err.message}`
        });
      });
  });
});

// API Call: ........./getBooks?limit=23&offset=23
exports.getBooks = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    if (req.method !== 'GET') {
      return res.status(404).json({
        message: 'Not allowed'
      });
    }

    let mapped_data = [];

    return (
      database
        // .startAfter(offset)
        // .limit(limit)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            let tempObj = doc.data();
            tempObj.id = doc.id;
            mapped_data.push(tempObj);
          });
          if (req.query.limit || req.query.offset) {
            let limit = req.query.limit;
            let offset = req.query.offset;
            return res.status(200).json(mapped_data.splice(offset, limit));
          }
          return res.status(200).json(mapped_data);
        })
        .catch(error => {
          return res.status(error.code).json({
            message: `Something went wrong. ${error.message}`
          });
        })
    );
  });
});

exports.getBooks2 = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    if (req.method !== 'GET') {
      return res.status(404).json({
        message: 'Not allowed'
      });
    }

    let mapped_data = [];

    return database
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let tempObj = doc.data();
          tempObj.id = doc.id;
          mapped_data.push(tempObj);
        });
      })
      .catch(error => {
        return res.status(error.code).json({
          message: `Something went wrong. ${error.message}`
        });
      });
  });
});

function distance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295; // Math.PI / 180
  var c = Math.cos;
  var a =
    0.5 -
    c((lat2 - lat1) * p) / 2 +
    (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

exports.getBooksByDistance = functions.https.onRequest((req, res) => {
  let lon = req.query.lon;
  let lat = req.query.lat;

  return cors(req, res, () => {
    if (req.method !== 'GET') {
      return res.status(404).json({
        message: 'Not allowed'
      });
    }

    let mapped_data = [];

    return database
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let tempObj = doc.data();
          tempObj.id = doc.id;
          tempObj.distance = distance(
            lat,
            lon,
            tempObj.location.lat,
            tempObj.location.lon
          );
          mapped_data.push(tempObj);
        });

        mapped_data.sort(compare);
        if (req.query.limit || req.query.offset) {
          return res
            .status(200)
            .json(mapped_data.splice(req.query.offset, req.query.limit));
        }
        return res.status(200).json(mapped_data);
      })
      .catch(error => {
        return res.status(error.code).json({
          message: `Something went wrong. ${error.message}`
        });
      });
  });
});

// API Call: ......./book?id=XXXXXXXXXXXXX
exports.book = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    let id = req.query.id;

    switch (req.method) {
      case 'GET':
        return database
          .doc(id)
          .get()
          .then(doc => {
            let tempObj = doc.data();
            tempObj.id = id;
            return res.status(200).json(tempObj);
          })
          .catch(error => {
            return res.status(error.code).json({
              message: `Something went wrong. ${error.message}`
            });
          });

      case 'DELETE':
        return database
          .doc(id)
          .delete()
          .then(() => {
            return res
              .status(200)
              .json({message: 'Succesfully delete document'});
          })
          .catch(error => {
            return res.status(error.code).json({
              message: `Something went wrong. ${error.message}`
            });
          });

      case 'PUT':
        let updateItem = req.body;
        return database
          .doc(req.query.id)
          .update(updateItem)
          .then(() => {
            return res
              .status(200)
              .json({message: `Succesfully update document`});
          })
          .catch(error => {
            return res.status(error.code).json({
              message: `Something went wrong. ${error.message}`
            });
          });

      case 'POST':
        let item = req.body;
        return database
          .add(item)
          .then(doc => {
            return res
              .status(200)
              .json({message: `Succesfully create new document ${doc.id}`});
          })
          .catch(error => {
            return res.status(error.code).json({
              message: `Something went wrong. ${error.message}`
            });
          });

      default:
        return res.status(404).json({
          message: `Request not found. ${error.message}`
        });
    }
  });
});

function compare(a, b) {
  if (a.distance < b.distance) return -1;
  if (a.distance > b.distance) return 1;
  return 0;
}

function calc_distance(a, b) {
  return geolib.getDistanceSimple(a, b);
}
