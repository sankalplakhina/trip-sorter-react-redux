import React from 'react';
import { Link } from 'react-router';

class NotFound extends React.PureComponent {
  render() {
    return (
    	<div>
    		404 Not Found
    		<Link to="/">Take me to main page!</Link>
    	</div>
    );
  }
}

export default NotFound;
