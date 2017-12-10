import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

class Home extends React.Component {
  render() {
    return (
    	<div className="home">
      		<Helmet title="Home | Trip Sorter"/>
      		{this.props.message}
    	</div>
    );
  }
}

export default Home;
