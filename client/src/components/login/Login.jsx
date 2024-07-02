import Path from "../../paths.js";
import { Link } from "react-router-dom";
import {useContext, useState} from "react";
import AuthContext from "../../context/authContext.jsx";
import useForm from "../../hooks/useForm.js";
import ErrorMessage from "../../components/error/ErrorMessage.jsx";

const loginForm = {
	Email: 'email',
	Password: 'password',
};

export default function Login() {
	const [error, setError ] = useState(null)

	const { loginSubmitHandler } = useContext(AuthContext);
	const { values, onChange, onSubmit} = useForm(handleLoginSubmit, {
		[loginForm.Email]: '',
		[loginForm.Password]: '',
	});

	async function handleLoginSubmit(values) {
		try {
			setError(null)
			await loginSubmitHandler(values);
		} catch (error) {
			setError(error.error);
		}
	}

	return (
		<section id="loginPage">
			<form onSubmit={onSubmit}>
				<fieldset>
					<legend>Login</legend>

					<label htmlFor="email" className="vhide">Email</label>
					<input
						id="email"
						className="email"
						name={loginForm.Email}
						type="text"
						placeholder="Email"
						onChange={onChange}
						value={values[loginForm.Email]}
					/>

					<label htmlFor="password" className="vhide">Password</label>
					<input
						id="password"
						className="password"
						name={loginForm.Password}
						type="password"
						placeholder="Password"
						onChange={onChange}
						value={values[loginForm.Password]}
					/>

					<button type="submit" className="login">Login</button>

					<ErrorMessage error={error} />

					<p className="field">
						<span>If you don't have a profile click <Link to={Path.Register}>here</Link></span>
					</p>
				</fieldset>
			</form>
		</section>
	);
}
