import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

class Results extends React.Component {

	componentDidMount(){
		console.log('Results componentDidMount');
	}

	render() {
		return (
			<div className="about">
		  		<Helmet title="Results | TripSorter"/>
				Results
				<Link to="/">Reset</Link>
			</div>
		);
	}
}

export default Results;
