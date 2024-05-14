import Path from "../../paths.js";
import {useContext} from "react";
import authContext from "../../context/authContext.jsx";
import useForm from "../../hooks/useForm.js";
import * as profilService from '../../services/profilService.js'

const registerFormKeys = {
	Email: 'email',
	Password: 'password',
	ConfirmPassword: 'conf-pass',
	AccName: 'accName',
	ImgUrl: 'imgUrl',
	FullName: 'fullName',
	Description: 'description',
}
export default function Register() {
	const {registerSubmitHandler} = useContext(authContext);
	const {values, onChange, onSubmit} = useForm(registerSubmitHandler, {
		[registerFormKeys.Email]: '',
		[registerFormKeys.Password]: '',
		[registerFormKeys.ConfirmPassword]: '',
		[registerFormKeys.AccName]: '',
		[registerFormKeys.FullName]: '',
		[registerFormKeys.ImgUrl]: '',
		[registerFormKeys.Description]: '',
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
						className="confPass"
						name="conf-pass"
						type="password"
						placeholder="Confirm Password"
						onChange={onChange}
						value={values[registerFormKeys.ConfirmPassword]}
					/>
					<label htmlFor="accName" className="vhide">Account Name</label>
					<input
						id="accName"
						className="accName"
						name="accName"
						type="text"
						placeholder="Account Name"
						onChange={onChange}
						value={values[registerFormKeys.AccName]}
					/>

					<label htmlFor="fullName" className="vhide">Account Name</label>
					<input
						id="fullName"
						className="fullName"
						name="fullName"
						type="text"
						placeholder="Full Name"
						onChange={onChange}
						value={values[registerFormKeys.FullName]}
					/>

					<label htmlFor="imgUrl" className="vhide">Account Name</label>
					<input
						id="imgUrl"
						className="imgUrl"
						name="imgUrl"
						type="text"
						placeholder="Image Url"
						onChange={onChange}
						value={values[registerFormKeys.ImgUrl]}
					/>

					<label htmlFor="description" className="vhide">Account Name</label>
					<textarea
						id="description"
						className="description"
						name="description"
						type="text"
						placeholder="Description"
						onChange={onChange}
						value={values[registerFormKeys.Description]}
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