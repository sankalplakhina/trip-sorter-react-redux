import { connect } from 'react-redux';
import * as appSelectors from 'src/js/components/app/selectors';
import Home from './home';

function mapStateToProps(state) {
  	return {
  		message: appSelectors.getCurrency(state)
  	};
}

function mapDispatchToProps(dispatch) {
  	return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);