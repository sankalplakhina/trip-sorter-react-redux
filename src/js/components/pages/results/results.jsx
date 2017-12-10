import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

class Results extends React.Component {
  render() {
    return (
    	<div className="about-page">
      		<Helmet title="Results | TripSorter"/>
    		Results
    		<Link to="/404">Go to 404</Link>
    	</div>
    );
  }
}

export default Results;
