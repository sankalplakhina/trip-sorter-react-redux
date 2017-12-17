import { connect } from 'react-redux';
import { withRouter } from 'react-router';
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
  		onFindPath: (from, to, sort) => dispatch(findShortestPath(from, to, sort)),
  		onSearch: (from, to, sort) => {
  			ownProps.router.replace(`/results?from=${from}&to=${to}&sort=${sort}`);
  		}
  	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Results);