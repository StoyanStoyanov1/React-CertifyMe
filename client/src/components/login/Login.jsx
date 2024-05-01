import Path from "../../paths.js";
import {Link} from "react-router-dom";
import {useContext} from "react";
import AuthContext from "../../context/authContext.js";
import useForm from "../../hooks/useForm.js";

const loginForm = {
	Email: 'email',
	Password: 'password',
}
export default function Login() {

	const {loginSubmitHandler} = useContext(AuthContext);

	const {values, onChange, onSubmit} = useForm(loginSubmitHandler, {
		[loginForm.Email]: '',
		[loginForm.Password]: '',
	})

	return (
		<section id="loginPage">
			<form onSubmit={onSubmit}>
				<fieldset>
					<legend>Login</legend>

					<label htmlFor="email" className="vhide">Email</label>
					<input
						id="email"
						className="email"
						name="email"
						type="text"
						placeholder="Email"
						onChange={onChange}
						value={values[loginForm.Email]}
					/>

					<label htmlFor="password" className="vhide">Password</label>
					<input
						id="password"
						className="password"
						name="password"
						type="password"
						placeholder="Password"
						onChange={onChange}
						value={values[loginForm.Email]}
					/>

					<button type="submit" className="login">Login</button>

					<p className="field">
						<span>If you don't have profile click <Link to={Path.Register}>here</Link></span>
					</p>
				</fieldset>
			</form>
		</section>
	)
}