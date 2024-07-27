import Path from "../../paths.js";
import {Link} from "react-router-dom";
import {useContext, useState} from "react";
import AuthContext from "../../context/authContext.jsx";
import useForm from "../../hooks/useForm.js";
import ErrorMessage from "../../components/error/ErrorMessage.jsx";

// Form field keys
const loginForm = {
	Email: 'email',
	Password: 'password',
};

export default function Login() {
	const [error, setError] = useState(null); // State to manage error messages

	const {loginSubmitHandler} = useContext(AuthContext); // Get the login handler from the Auth context
	const {values, onChange, onSubmit} = useForm(handleLoginSubmit, {
		[loginForm.Email]: '',
		[loginForm.Password]: '',
	}); // Initialize form state and handlers using useForm hook

	const [validator, setValidator] = useState({
		[loginForm.Email]: false,
		[loginForm.Password]: false,
	}); // State to manage validation errors

	const [showTooltip, setShowTooltip] = useState({
		email: false,
		password: false,
	}); // State to manage tooltips visibility

	// Function to handle form submission
	async function handleLoginSubmit(values) {
		setError(null);
		setValidator({
			[loginForm.Email]: false,
			[loginForm.Password]: false,
		});

		// Validate email format
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
			return setValidator(prevState => ({...prevState, ['email']: true}));
		}

		// Validate password presence
		if (values.password === '') {
			return setValidator(prevState => ({...prevState, ['password']: true}));
		}

		try {
			await loginSubmitHandler(values); // Attempt to log in the user
		} catch (error) {
			setError(error.error); // Set error message if login fails
		}
	}

	// Function to handle mouse enter and leave events for tooltips
	const handleMouse = (field, aktiv) => {
		setShowTooltip(prevState => ({...prevState, [field]: aktiv}));
	};

	return (
		<section id="loginPage">
			<form onSubmit={onSubmit}>
				<fieldset>
					<legend>Login</legend>

					<div className='input-container'>
						<label htmlFor="email" className="vhide">Email</label>
						{validator.email && <p className='error-message'>Add a valid email!</p>}
						<input
							id="email"
							className="email"
							name={loginForm.Email}
							type="text"
							placeholder="Email"
							onChange={onChange}
							value={values[loginForm.Email]}
							onMouseEnter={() => handleMouse('email', true)}
							onMouseLeave={() => handleMouse('email', false)}
						/>
						{showTooltip.email && <div className="tooltip">Enter your email!</div>}
					</div>

					<div className='input-container'>
						<label htmlFor="password" className="vhide">Password</label>
						{validator.password && <p className='error-message'>Add your password!</p>}
						<input
							id="password"
							className="password"
							name={loginForm.Password}
							type="password"
							placeholder="Password"
							onChange={onChange}
							value={values[loginForm.Password]}
							onMouseEnter={() => handleMouse('password', true)}
							onMouseLeave={() => handleMouse('password', false)}
						/>
						{showTooltip.password && <div className='tooltip'>Enter your password!</div>}
					</div>

					<ErrorMessage error={error}/> {/* Display error message if any */}

					<button type="submit" className="login">Login</button>

					<p className="field">
						<span>If you don't have a profile click <Link to={Path.Register}>here</Link></span>
					</p>
				</fieldset>
			</form>
		</section>
	);
}
