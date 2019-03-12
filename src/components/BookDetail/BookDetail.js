import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import GoogleMap from '../GoogleMap/GoogleMap';
import imageDummy from '../../images/dummy.png';


const BookDetail = props => {


return(
	<div>

		<h1>Book Detail</h1>

		<h3>
			<div className ='book-title'> Book Title</div>
		</h3>

		<img className ='imageBook'src ={imageDummy} />

		<p>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
		sed do eiusmod tempor incididunt ut labore 
		</p>
		<h4>Description </h4>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
		sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
		quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		
		<h4>Pickup Location </h4>
		<div className="google-map-wrapper">
        <GoogleMap />
      	</div>

      

      	<h3> Lender </h3>
      	
      	<button> Request </button>



		

		 
      </div>




	
)

}



export default BookDetail;



