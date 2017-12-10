import React from 'react';

class AppContainer extends React.Component {
  render() {
    return (
    	<div>
    		{this.props.children}
    	</div>
    );
  }
}

AppContainer.propTypes = {
  children: React.PropTypes.any,
};

export default AppContainer;
