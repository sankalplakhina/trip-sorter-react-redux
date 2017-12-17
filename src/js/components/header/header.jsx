import React from 'react';
import { Link } from 'react-router';

class Header extends React.Component {
  render() {
    return (
    	<nav className="navbar navbar-default navbar-fixed-top">
	      <div className="container text-center">
	        <div className="header-text">
	          	<Link to="/" title="Trip Sorter">Trip Sorter</Link>
	        </div>
	      </div>
	    </nav>
    );
  }
}

export default Header;
