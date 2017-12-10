import React from 'react';
import Header from 'src/js/components/header';
import Footer from 'src/js/components/footer';
import { getStore } from 'src/js/store';
import deals from './deals';

class App extends React.Component {

	componentDidMount(){
		deals.createGraph(getStore().getState());
	}

	render() {
		return (
			<div>
				<Header />
				<div className="page-body container">{this.props.children}</div>
				<Footer />
			</div>
		);
	}
}

export default App;
