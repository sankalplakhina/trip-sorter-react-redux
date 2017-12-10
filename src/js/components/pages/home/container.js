import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as appSelectors from 'src/js/components/app/selectors';
import Home from './home';

function mapStateToProps(state) {
  	return {
  		message: appSelectors.getCurrency(state),
  		fromToOptions: appSelectors.getDepartueArrivalOptions(state),
  	};
}

function mapDispatchToProps(dispatch, ownProps) {
  	return {
  		onSearch: (from, to, sort) => {
  			ownProps.router.push(`/results?from=${from}&to=${to}&sort=${sort}`);
  		}
  	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));