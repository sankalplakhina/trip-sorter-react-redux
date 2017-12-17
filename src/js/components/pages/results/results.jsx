import _ from 'lodash';
import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import classNames from 'classnames';
import { bindHandlers } from 'react-bind-handlers';

class Results extends React.Component {
	constructor(){
		super();

		this.state = {
			isInvalidInputs: false,
			isSamePath: false,
		};
	}

	componentDidMount(){
		const { location : { query: { from = '', to = '', sort = '' } }, shortestPath, onFindPath } = this.props;

		if (!shortestPath) {
			const fromParsed = _.upperFirst(from.toLowerCase());
			const toParsed = _.upperFirst(to.toLowerCase());
			const sortParsed = sort.toLowerCase();

			if (fromParsed && toParsed && fromParsed !== toParsed) {
				onFindPath(fromParsed, toParsed, sortParsed);
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

		if (_.isEqual(nextProps.shortestPath, shortestPath)) {
			console.log('tehy are same');
			this.setState({
				isSamePath: true
			});
		} else if (this.state.isSamePath) {
			this.setState({
				isSamePath: false
			});
		}
	}

	handleSwitchSort() {
		const { location : { query: { from, to, sort } }, onSearch, onFindPath } = this.props;
		const sortType = (sort && sort.toLowerCase() === "fastest")? 'cheapest' : 'fastest';

		onFindPath(from, to, sortType);
		onSearch(from, to, sortType);
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
		const { shortestPath, location : { query: { from, to, sort } } } = this.props;
		const { isInvalidInputs, isSamePath } = this.state;

		return (
			<div className="results">
		  		<Helmet title="Results | TripSorter"/>
		  		<div className="row">
		  			<div className="results-container col-xs-12 col-sm-4 col-sm-offset-4 text-center well-sm">
		  				{
		  					shortestPath && !isSamePath && (
		  						<div className="results-header">
		  							{`Found it! And the `}<b>{(sort && sort.toLowerCase() === "fastest")? 'fastest' : 'cheapest'}</b>{` way is:`}
		  						</div>
		  					)
		  				}
		  				{
		  					shortestPath && isSamePath && (
		  						<div className="results-header">
		  							{`Same result! It appears following is both `}<b>{`cheapest and fastest`}</b>{` way:`}
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
	  							<a
	  								key="alternate"
	  								onClick={this.handleSwitchSort}
	  								className={classNames("results-header results-header--link", {
	  									'hidden': isSamePath
	  								})}>
	  								{`Check the `}<b>{(sort && sort.toLowerCase() === "fastest")? 'cheapest' : 'fastest'}</b>{` route instead?`}
	  							</a>
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
    								{isInvalidInputs && (<p>Let's get you home?	<Link to="/">Go Home</Link></p>)}
			  					</div>
		  					)
	  					}
		  			</div>
		  		</div>
			</div>
		);
	}
}

export default bindHandlers(Results);
