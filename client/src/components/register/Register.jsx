import Path from "../../paths.js";

export default function Register() {
	return (
		<section id="registerPage">
			<form>
				<fieldset>
					<legend>Register</legend>

					<label htmlFor="email" className="vhide">Email</label>
					<input id="email" className="email" name="email" type="text" placeholder="Email"/>

					<label htmlFor="firstName" className="vhide">Email</label>
					<input id="firstName" className="firstName" name="firstName" type="text" placeholder="First Name"/>

					<label htmlFor="lastName" className="vhide">Email</label>
					<input id="lastName" className="lastName" name="lastName" type="text" placeholder="Last Name"/>

					<label htmlFor="password" className="vhide">Password</label>
					<input id="password" className="password" name="password" type="password" placeholder="Password"/>

					<label htmlFor="conf-pass" className="vhide">Confirm Password:</label>
					<input id="conf-pass" className="conf-pass" name="conf-pass" type="password"
						   placeholder="Confirm Password"/>

					<button type="submit" className="register">Register</button>

					<p className="field">
						<span>If you already have profile click <a href={Path.Login}>here</a></span>
					</p>
				</fieldset>
			</form>
		</section>
	)
}