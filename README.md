# BOOKIO | Free book-sharing made easy
An endeavour for the *Interaction Programming and Dynamic Web* course, 2019 at KTH Royal Institute of Technology.

## https://bookio-5c798.firebaseapp.com/

BOOKIO is a book-sharing platform where any logged in user can lend out or give away a book for free. The platform requires the visitor to create a user profile, such that people have an idea whom they are interacting with. Users can create a post for renting out, or giving away, their book(s) and provide details such as time and location of pick-up. For an improved user experience, the user can search for a book using the Goodreads API. When a title is selected, the name of the author and the ratings the book got on Goodreads will be associated with it. The user can provide pictures of the book, as well as the pick up location and a descprition or recommendation. The application has a full-text search functionality, and the book overview page allows filtering by type.

## User instructions

The website's latest build is available here: [BOOKIO](https://bookio-5c798.firebaseapp.com/).

In order to be able to interact with the website, one has to create a user account. An account can either be made by using an email and password combination (which has to be verified) or by logging in to Facebook.\
Once the user has been authenticated, the user has access to the add books page as well as a personal account page, and he or she can make requests, .

## What we have done

> Pages:

- Sign in/up Page
- Password Forgot Page
- Books Overview Page
- Book Detail Page
- Add Book Page
- Requests/History Page
- Account Page
  - Find back/change password, delete account, etc
  - Upload Avatar

[**Design**](#Design)

- Full design for desktop.
- Full design for mobile.

**Development**

> Used frameworks and services

- Node application
- React as front-end framework
- Redux for state management
- SCSS for styling
- Firebase as backend for authentication, media and the books database (Firestore)
- Algolia: syncs with Firestore for full-text search and fast filtering
- Some custom components like Dropdown, Button are created.
- Google Maps API
- Facebook API

## Project file structure

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
Any files belonging to Create React App will not be explained here.

`/scr`

- `.env'\
  In this file we store all our API keys and environment variables.
  
- `index.js`\
  The root JS file of the project. In this file, all pages are loaded and
  react-router-dom is used to render the pages based on the URL. Also, the Redux
  store as well as the Firebase context are provided to the app in this file.

`/components`

- `/Account`\
  This folder contains four React components (Avatar.js,
  DefaultLoginToggle, DeleteAccount and LoginManagement) that take care of displaying authUser
  information on the account page. This folder also contains a stylesheet \_Avatar.scss).
- `/AddNewBookFor`\
  This folder contains two React components (AddNewBookForm.js,
  DragAndDrop.js and Titleform.js) that allow the user to
  add a new book. This folder also contains two stylesheets (\_AddNewBookForm.scss, \_DragAndDrop.scss).
  - `/Algolia`\
  Some Algolia endpoints are defined in index.js.
- `/Authentication`\
  This folder contains all React components that take care of user authentication,
  which include (PasswordForget.js, SignIn.js, SignOut.js, and SignUp.js).
  This folder also contains some stylesheets (\_Authentication.scss, \_PasswordForget.js,
  \_SignIn.scss, \_SignOut.scss and \_SignUp.scss).
- `/BookItem`\
  This folder contains the BookItem.js React Component. This is a presentational
  component that displays a book item. The \_BookItem.scss is the stylesheet associated
  with it.
- `/Books`\
  This folder contains components for the book overview page (FilterGroup.js,
  RatingStars.js, SearchResults.js, UserLable.js) and two stylesheets (\_SearchResults.scss 
  and \_UserLabel.scss)
- `/BrandLogo`\
  This folder contains the BrandLogo.js React Component. This is a presentational
  component that displays the brand logo. The \_BrandLogo.scss is the stylesheet
  associated with it.
- `/Button`\
  This folder contains the Button.js React Component. This is a presentational
  component that displays button; it has the \_BrandLogo.scss stylesheet
  associated with it.
- `/Dropdown`\
  This folder contains the Dropdown.js React Component, which is a reusable
  dropdown component. It has the \_Dropdown.scss stylesheet associated with it.
- `/Firebase`\
  This folder contains three files (firebase.js, index.js and context.js) and
  takes care of communication with the backend of our application. We created a
  withReact.js HOC that uses the React Context to enable the component that it
  encapsulates to use the Firebase functions.
- `/Footer`\
  This folder contains the Footer.js React component and a stylesheet associated
  with it (\_Footer.js).
- `/GoogleMap`\
  This folder contains the GoogleMap.js React component, which renders a Google
  Map retrieved via the Google Maps API.
- `/History`\
  This folder contains components for the History page (ItemInfo.js and RequestMessage.js),
  as well as a stylesheet (\_HistoryComponents.sss).
- `/Loader`\
  This folder contains a standard Loader.js React component and a stylesheet
  association with it (\_Loader.scss).
- `/Navbar`\
  This folder contains the Navbar.js React component and a stylesheet
  association with it (\_Navbar.scss).
- `/Pagination`\
  This folder contains the Pagination.js React component and a stylesheet
  association with it (\_Pagination.scss).
- `/PasswordChange`\
  This folder contains the PasswordChange.js React component and a stylesheet
  association with it (\_PasswordChange.scss).
- `/Search`\
  This folder contains the Search.js React component and a stylesheet
  association with it (\Search.scss).
- `/Session`\
  This folder contains files that take care of handling the user session.
  It contains three HOCs: withAuthentication.js, withAuthorization.js and
  withEmailverification.js, as well as a stylesheet (\_Session.scss).

`/constants`
- `fa.js`\
  This file contains all the Font Awesome icons used in the app.
- `routes.js`\
  This file contains all routes constants.

`/helpers`
- `locationHelper.js`\
  Helper for doing location and distance calculations.
- `storageHelper.js`\
  Helper for storing data in Firebase.
- `utils.js`\
  This file contains util functions.
- `validationHelper.js`\
  This file contains helper functions for validation.

`/hooks`

- `index.js`\
  We use [React Hooks](https://reactjs.org/hooks). In this file we define all our
  custom React hooks.

`/images`\
Folder containing static images.

`/pages`\
We decided to have a distinction between components and pages. Pages can consist
of multiple components. The filename of the page should be self-explanatory.

- `AccountPage.js` (with \_AccountPage.scss)
- `AddNewBookPage.js`(with \_AddNewBookPage.scss)
- `BookDetail.js`(with \_BookDetail.scss)
- `BooksPage.js`(with \_BooksPage.scss)
- `EditProfilePage.js`(with \_EditProfilePage.scss)
- `HistoryPage.js`(with \_HistoryPage.scss)
- `HomePage.js`(with \_HomePage.scss)
- `PasswordForgetPage.js`
- `SettingsPage.js`
- `SignInPage.js`
- `SignUpPage.js`

`/redux`\
We use [Redux](https://redux.js.org/) for the state management of our app. The
structure of the folders is the standard best-practice structure for Redux.

- `index.js`
- `actions/`
- `constants/`
- `reducers/`
- `store/`

`/styling`

- `style.scss`\
  In this file we bundle all stylesheets, both the component/page specific and generic
  stylesheets.

- `includes/`\
  The includes folder contains several files and sub-folders. These can be roughly
  divded in a base stylesheet and variables stylesheets.
  - `variables/`
  - `\_base.scss`
  - `\_variables.scss`
