import {Component} from "react";
import errorImage from '../../public/images/404.jpg';

export default class ErrorBoundary extends Component {
	constructor() {
		super();

		this.state = {
			hasError: false, // State to track if an error has occurred
		};
	}

	// Method to update state when an error is caught
	static getDerivedStateFromError(err) {
		console.log('getDerivedStateFromError');

		return {
			hasError: true, // Set the error state to true
		};
	}

	// Method to log error details
	componentDidCatch(error, errorInfo) {
		console.log('componentDidCatch', error, errorInfo);
	}

	// Render method to display the error image if an error is caught, otherwise render children components
	render() {
		if (this.state.hasError) {
			return (
				<div className='404'>
					<img src={errorImage} alt='404' />
				</div>
			);
		}

		return this.props.children; // Render child components if no error is caught
	}
}
