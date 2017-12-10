import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

class Component extends React.Component {
  render() {
    return (
    	<div>
      		New Component
    		<Link to="/home">Go home</Link>
    	</div>
    );
  }
}

export default Component;
