import React from 'react';
import Header from 'src/js/components/header';
import Footer from 'src/js/components/footer';

class App extends React.Component {

	componentDidMount(){
		console.log('App componentDidMount');
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
