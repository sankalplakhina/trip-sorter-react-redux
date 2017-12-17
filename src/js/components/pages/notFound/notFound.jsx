import React from 'react';
import { Link } from 'react-router';

const NotFound = () => {
    return (
    	<div className="row">
    		<h4 className="col-xs-offset-4 col-xs-4">
    			Ooops! You have reached a 404 Not Found situation.
    			Let's get you home?	<Link to="/">Go Home</Link>
    		</h4>
    	</div>
    );
}

export default NotFound;
