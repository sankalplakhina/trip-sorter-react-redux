import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { bindHandlers } from 'react-bind-handlers';
import Dropdown from 'react-dropdown';

class Home extends React.Component {

	handleFromSelect(...args){
		console.log('yo from', args);
	}

	handleToSelect(...args){
		console.log('yo to', args);
	}

	handleSearch(...args) {
		console.log('search', args);
		this.props.onSearch('London', 'Moscow', 'fastest');
	}

	render() {
		const { fromToOptions } = this.props;
		return (
			<div className="home container">
		  		<Helmet title="Home | Trip Sorter"/>
		  		<div className="row">
		  			<div className="col-xs-12 col-sm-4 col-sm-offset-4 text-center well">

	  						<div className="col-xs-12 dd-from">
			  					<Dropdown
			  						className=""
			  						options={fromToOptions.from}
			  						onChange={this.handleFromSelect}
			  						placeholder="From" />
	  						</div>

	  						<div className="col-xs-12 dd-to">
		  						<Dropdown
		  							className=""
		  							options={fromToOptions.to}
		  							onChange={this.handleToSelect}
		  							placeholder="To" />
	  						</div>

	  						<div className="col-xs-12 sort-optn">
		  						<div className="col-xs-6 optn selected">Cheapest</div>
		  						<div className="col-xs-6 optn">Fastest</div>
	  						</div>

	  						<div className="col-xs-12 search-btn">
		  						<button
		  							type="button"
		  							className="btn btn-success"
		  							onClick={this.handleSearch}>
		  							Search
		  						</button>
	  						</div>
		  			</div>
		  		</div>
			</div>
		);
	}
}

export default bindHandlers(Home);
