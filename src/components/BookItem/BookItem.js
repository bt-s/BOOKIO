import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import reactJPG from '../../images/fullstackreact.jpg';
import reactSVG from '../../images/react.svg';
import * as ROUTES from '../../constants/routes';
import {UserLabel, Address} from '../Books/Components';
import {RatingStars} from '../Books/Components';

const BookItem = props => (
  <div className="book-item-container">
    {/* <Link to={ROUTES.BOOK_DETAIL}> */}
    <Link to="/detail">
      <img
        className="book-item-cover-image"
        src={props.imageSource}
        alt={props.bookTitle}
      />
      <h2>{props.bookTitle}</h2>
      <h3>{props.authorName}</h3>
    </Link>
    <div className="book-item-details">
      <img
        className="book-item-user-avatar"
        src={props.userAvatar}
        alt={props.userName}
      />
      <span className="book-item-user-name">{props.userName}</span>
      <span className="book-item-location-name">{props.locationName},</span>
      <span className="book-item-location-distance">
        {props.locationDistance}
      </span>
    </div>
  </div>
);

BookItem.propTypes = {
  imageSource: PropTypes.string,
  bookTitle: PropTypes.string,
  authorName: PropTypes.string,
  userAvatar: PropTypes.string,
  userName: PropTypes.string,
  locationName: PropTypes.string,
  locationDistance: PropTypes.string
};

BookItem.defaultProps = {
  imageSource: reactJPG,
  bookTitle: 'Fullstack React',
  authorName: 'Accomazzo Anthony, Ari Lerner, and Murray Nathaniel',
  userAvatar: reactSVG,
  userName: 'React Wizard',
  locationName: 'Brinellvägen 8',
  locationDistance: '200m'
};

/*










*/

const BookItem_v2 = props => {
  console.log(props);

  return (
    <div className="book-item-v2-container">
      {/* <Link to={ROUTES.BOOK_DETAIL}> */}
      <Link to="/detail" className="img-container">
        <img src={props.imageSource} alt={props.bookTitle} />
      </Link>
      <Link to="/detail" className="info-container">
        <div className="information">
          <div className="info-upper">
            <div className="info-title">{props.bookTitle}</div>
            <RatingStars rating="3.5" />
            {props.type === 'Give Away' ? (
              <div className="label give">{props.type}</div>
            ) : (
              <div className="label lend">{props.type}</div>
            )}
            <div className="cut-off" />
          </div>
          <div className="info-middle">
            <p>
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a pieceof classical Latin literature from 45 BC,
              making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur, from a Lorem Ipsum
              passage, and going through the cites of the word in classical
              literature, discovered the undoubtable source. Lorem Ipsum comes
              from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
              Malorum"
            </p>
          </div>
          <div className="info-lower">
            <UserLabel
              // avatarURL={props.userAvatar}
              // userName={props.userName}
              bio={props.bio}
            />
            <Address
              name={props.locationName}
              distance={props.locationDistance}
            />
          </div>
        </div>
      </Link>
    </div>
  );
};
BookItem_v2.defaultProps = {
  type: 'Give Away',
  imageSource: reactJPG,
  bookTitle: 'Fullstack React Blablablablablablablablabla',
  authorName: 'Accomazzo Anthony, Ari Lerner, and Murray Nathaniel',
  userAvatar: reactSVG,
  userName: 'React Wizard',
  locationName: 'Brinellvägen 89999999',
  locationDistance: '200m',
  bio: "All that we are is the result of what we've thought"
};

export {BookItem, BookItem_v2};
