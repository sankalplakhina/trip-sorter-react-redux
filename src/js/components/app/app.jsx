import React from 'react';
import Header from 'src/js/components/header';
import Footer from 'src/js/components/footer';
import deals from 'src/js/components/pages/results/deals';

class App extends React.Component {

	componentDidMount(){
		// create graph here so that we have the graph ready before user makes search from home page
		deals.createGraph();
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
