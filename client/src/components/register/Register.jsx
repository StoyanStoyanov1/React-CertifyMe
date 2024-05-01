import Path from "../../paths.js";
import {useContext} from "react";
import authContext from "../../context/authContext.js";
import useForm from "../../hooks/useForm.js";

const registerFormKeys = {
	Email: 'email',
	Password: 'password',
	ConfirmPassword: 'conf-pass',
	FirstName: 'firstName',
	LastName: 'lastName',
}
export default function Register() {
	const {registerSubmitHandler} = useContext(authContext);
	const {values, onChange, onSubmit} = useForm(registerSubmitHandler, {
		[registerFormKeys.Email]: '',
		[registerFormKeys.Password]: '',
		[registerFormKeys.ConfirmPassword]: '',
		[registerFormKeys.FirstName]: '',
		[registerFormKeys.LastName]: '',
	})

	return (
		<section id="registerPage">
			<form onSubmit={onSubmit}>
				<fieldset>
					<legend>Register</legend>

					<label htmlFor="email" className="vhide">Email</label>
					<input
						id="email"
						className="email"
						name="email"
						type="text"
						placeholder="Email"
						onChange={onChange}
						value={values[registerFormKeys.Email]}
					/>

					<label htmlFor="firstName" className="vhide">Email</label>
					<input
						id="firstName"
						className="firstName"
						name="firstName"
						type="text"
						placeholder="First Name"
						onChange={onChange}
						value={values[registerFormKeys.FirstName]}
					/>

					<label htmlFor="lastName" className="vhide">Email</label>
					<input
						id="lastName"
						className="lastName"
						name="lastName"
						type="text"
						placeholder="Last Name"
						onChange={onChange}
						value={values[registerFormKeys.LastName]}
					/>

					<label htmlFor="password" className="vhide">Password</label>
					<input
						id="password"
						className="password"
						name="password"
						type="password"
						placeholder="Password"
						onChange={onChange}
						value={values[registerFormKeys.Password]}
					/>

					<label htmlFor="conf-pass" className="vhide">Confirm Password:</label>
					<input
						id="conf-pass"
						className="conf-pass"
						name="conf-pass"
						type="password"
						placeholder="Confirm Password"
						onChange={onChange}
						value={values[registerFormKeys.ConfirmPassword]}
					/>

					<button type="submit" className="register">Register</button>

					<p className="field">
						<span>If you already have profile click <a href={Path.Login}>here</a></span>
					</p>
				</fieldset>
			</form>
		</section>
	)
}