import {Component} from "react";
import errorImage from '../../public/images/404.jpg'

export default class ErrorBoundary extends Component {
	constructor() {
		super();

		this.state = {
			hasError: false
		};
	}

	static getDerivedStateFromError(err) {
		console.log('componentDidCatch');

		return {
			hasError: true,
		}
	}

	componentDidCatch(error, errorInfo) {
		console.log('componentDitCatch');
	}

	render() {

		if (this.state.hasError) {
			return <div className='404'>
				<img src={errorImage} alt='404'/>
			</div>
		}

		return (
			this.props.children
		)
	}
}