import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

class Home extends React.Component {
  render() {
    return (
    	<div className="home-page">
      		<Helmet title="Home | Trip Sorter"/>
      		{this.props.message}
    		<Link to="/about">Go to About</Link>
    	</div>
    );
  }
}

export default Home;
