import React from 'react';

class Footer extends React.Component {
  render() {
    return (
    	<footer className="footer">
	      <div className="container text-center">
	        <div className="social-links">
		        <a
		        	href="https://github.com/sankalplakhina"
		        	target="_blank"
		        	className="social-links-link"
		        	title="View Sankalp Lakhina's Github profile">
		        	<img src="/assets/static/github.png" />
		        </a>
	        	<a
	        		href="https://www.linkedin.com/in/sankalplakhina"
	        		target="_blank"
	        		className="social-links-link"
	        		title="View Sankalp Lakhina's Linekdin profile">
	        		<img src="/assets/static/linkedin.png" />
	        	</a>
	        	<a
	        		href="mailto:sankalp.lakhina91@gmail.com"
	        		target="_blank"
	        		className="social-links-link"
	        		title="Email Sankalp Lakhina">
	        		<img src="/assets/static/email.png" />
	        	</a>
	        </div>
	      </div>
	    </footer>
    );
  }
}

export default Footer;
