import { connect } from 'react-redux';
import Results from './results';
import { findShortestPath } from './actions';
import { getShortestPath } from './selectors';

function mapStateToProps(state, ownProps) {
	const { location : { query: { from, to, sort } } } = ownProps;

  	return {
  		shortestPath: getShortestPath(state, from, to, sort),
  	};
}

function mapDispatchToProps(dispatch, ownProps) {
  	return {
  		onMount: (from, to, sort) => dispatch(findShortestPath(from, to, sort)),
  	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Results);