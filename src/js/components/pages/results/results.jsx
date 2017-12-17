import _ from 'lodash';
import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

class Results extends React.Component {
	constructor(){
		super();

		this.state = {
			isInvalidInputs: false,
		};
	}

	componentDidMount(){
		const { location : { query: { from, to, sort } }, shortestPath, onMount } = this.props;

		if (!shortestPath) {
			if (from && to) {
				onMount(from, to, sort);
			} else {
				this.setState({
					isInvalidInputs: true,
				});
			}
		}
	}

	componentWillReceiveProps(nextProps) {
		const { location : { query: { from, to } }, shortestPath } = this.props;

		if (from && to && !shortestPath && !nextProps.shortestPath && !this.state.isInvalidInputs) {
			this.setState({
				isInvalidInputs: true,
			});
		}
	}

	getCalculatedCost(cost, discount) {
		return cost - (discount/100 * cost);
	}

	getDurationText(durationMins) {
		return `${Math.floor(durationMins/60)}h${durationMins%60}m`;
	}

	getTotalDuration(shortestPath) {
		return this.getDurationText(_.sum(shortestPath.map((item) => item.duration)));
	}

	getTotalCost(shortestPath) {
		return _.sum(shortestPath.map((item) => this.getCalculatedCost(item.cost, item.discount)));
	}

	render() {
		const { shortestPath, location : { query: { sort } } } = this.props;
		const { isInvalidInputs } = this.state;

		return (
			<div className="results">
		  		<Helmet title="Results | TripSorter"/>
		  		<div className="row">
		  			<div className="results-container col-xs-12 col-sm-4 col-sm-offset-4 text-center well-sm">
		  				{
		  					shortestPath && (
		  						<div className="results-header">
		  							{`Found it! And the `}<b>{(sort && sort.toLowerCase() === "fastest")? 'fastest' : 'cheapest'}</b>{` way is:`}
		  						</div>
		  					)
		  				}
		  				{
		  					_.map(shortestPath, (path, index) => {
		  						const {
		  							cost,
		  							discount,
		  							from,
		  							to,
		  							transport,
		  							reference,
		  							duration,
		  						} = path;

		  						return (
		  							<div
		  								key={`${from}-${to}`}
		  								className="results-item"
		  							>
	  									<div className="results-item-desc">
	  										<div className="results-item-desc-location">
	  											<b>{from}</b>
	  											<span className="glyphicon glyphicon-share-alt"></span>
	  											<b>{to}</b>
	  										</div>
	  										<div className="results-item-desc-mode">
	  											<span className="transport">{transport}</span>
	  											<span>{`${reference} for ${this.getDurationText(duration)}`}</span>
	  										</div>
	  									</div>
	  									<div className="results-item-price text-right">
	  										{`${this.getCalculatedCost(cost, discount)}`} &#8364;
	  									</div>
		  							</div>
		  						);
		  					})
		  				}
  						{
  							shortestPath && [(
  								<div
	  								key="total"
	  								className="results-item"
	  							>
  									<div className="results-item-total">
  										Total
  									</div>
  									<div className="results-item-duration">
  										{this.getTotalDuration(shortestPath)}
  									</div>
  									<div className="results-item-price text-right">
  										{this.getTotalCost(shortestPath)} &#8364;
  									</div>
	  							</div>
	  						),
	  						(
  								<div
  									key="reset"
  									className="col-xs-12 reset-btn">
			  						<button
			  							type="button"
			  							className="btn btn-success"
			  						>
			  							<Link className="reset-btn-text" to="/">Reset</Link>
			  						</button>
		  						</div>
		  					)]
	  					}
	  					{
	  						!shortestPath && (
			  					<div className="col-xs-12 reset-btn">
			  						<h3>{isInvalidInputs? 'Oops!' : 'Loading...'}</h3>
			  						<p>{isInvalidInputs? 'We found nothing! Check your inputs maybe? #lifeCanBeHard' : 'Be patient! We are Trip"sorting" it out! #noPunIntended'}</p>
			  					</div>
		  					)
	  					}
		  			</div>
		  		</div>
			</div>
		);
	}
}

export default Results;
