import React from 'react';
import Helmet from 'react-helmet';
import classNames from 'classnames';
import Dropdown from 'react-dropdown';
import { Link } from 'react-router';
import { bindHandlers } from 'react-bind-handlers';

class Home extends React.Component {
	constructor(){
		super();

		this.state = {
			sort: 'cheapest',
			from: '',
			to: '',
		};

		this.handleSelectCheapestSort = this.handleSelectSort.bind(this, "cheapest");
		this.handleSelectFastestSort = this.handleSelectSort.bind(this, "fastest");
	}

	handleFromSelect(selectedFrom){
		this.setState({
			from: selectedFrom.value,
		})
	}

	handleToSelect(selectedTo){
		this.setState({
			to: selectedTo.value,
		})
	}

	handleSelectSort(sort) {
		this.setState({
			sort,
		});
	}

	handleSearch() {
		const { from, to, sort } = this.state;
		this.props.onSearch(from, to, sort);
	}

	render() {
		const { fromToOptions } = this.props;
		const { from, to, sort } = this.state;

		return (
			<div className="home container">
		  		<Helmet title="Home | Trip Sorter"/>
		  		<div className="row">
		  			<div className="col-xs-12 col-sm-4 col-sm-offset-4 text-center well">

	  						<div className="col-xs-12 dd-from">
			  					<Dropdown
			  						value={from}
			  						options={fromToOptions.from}
			  						onChange={this.handleFromSelect}
			  						placeholder="From" />
	  						</div>

	  						<div className="col-xs-12 dd-to">
		  						<Dropdown
		  							value={to}
		  							options={fromToOptions.to}
		  							onChange={this.handleToSelect}
		  							placeholder="To" />
	  						</div>

	  						<div className="col-xs-12 sort-optn">
		  						<div
		  							className={classNames("col-xs-6 optn", {
		  								'selected': (sort === "cheapest"),
		  							})}
		  							onClick={this.handleSelectCheapestSort}
		  						>
		  							Cheapest
		  						</div>
		  						<div
		  							className={classNames("col-xs-6 optn", {
		  								'selected': (sort === "fastest"),
		  							})}
		  							onClick={this.handleSelectFastestSort}
		  						>
		  							Fastest
		  						</div>
	  						</div>

	  						<div className="col-xs-12 search-btn">
		  						<button
		  							type="button"
		  							className="btn btn-success"
		  							disabled={!(from && to && sort)}
		  							onClick={this.handleSearch}
		  						>
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
