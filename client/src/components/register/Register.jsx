import Path from "../../paths.js";
import {useContext, useState} from "react";
import authContext from "../../context/authContext.jsx";
import useForm from "../../hooks/useForm.js";
import ErrorMessage from "../error/ErrorMessage.jsx";
import {Link} from "react-router-dom";

const registerFormKeys = {
	Email: 'email',
	Password: 'password',
	ConfirmPassword: 'conf-pass',
	Username: 'username',
	ImgUrl: 'imgUrl',
	FullName: 'fullName',
	Description: 'description',
}
export default function Register() {
	const [error, setError] = useState(null);

	const {registerSubmitHandler} = useContext(authContext);
	const {values, onChange, onSubmit} = useForm(handleLoginSubmit, {
		[registerFormKeys.Email]: '',
		[registerFormKeys.Password]: '',
		[registerFormKeys.ConfirmPassword]: '',
		[registerFormKeys.Username]: '',
		[registerFormKeys.FullName]: '',
		[registerFormKeys.ImgUrl]: '',
		[registerFormKeys.Description]: '',
	})

	const [showTooltip, setShowTooltip] = useState({
		email: false,
		password: false,
		confirmPassword: false,
		username: false,
		imgUrl: false,
		fullName: false,
		description: false,
	});

	async function handleLoginSubmit(values) {
		try {
			setError(null)
			await registerSubmitHandler(values);
		} catch (error) {
			console.log(error)
			setError(error.message);
		}
	}

	const handleMouse = (field, aktiv) => {
		setShowTooltip(prevState => ({...prevState, [field]: aktiv}));
	}

	return (
		<section id="registerPage">
			<form onSubmit={onSubmit}>
				<fieldset>
					<legend>Register</legend>

					<div className='input-container'>

						<label htmlFor="email" className="vhide">Email</label>
						<input
							id="email"
							className="email"
							name={registerFormKeys.Email}
							type="text"
							placeholder="Email"
							onChange={onChange}
							value={values[registerFormKeys.Email]}
							onMouseEnter={() => handleMouse(registerFormKeys.Email, true)}
							onMouseLeave={() => handleMouse(registerFormKeys.Email, false)}
						/>
						{showTooltip[registerFormKeys.Email] && <div className="tooltip">Enter your email!</div>}

					</div>
					<div className='input-container'>
						<label htmlFor="password" className="vhide">Password</label>
						<input
							id="password"
							className="password"
							name={registerFormKeys.Password}
							type="password"
							placeholder="Password"
							onChange={onChange}
							value={values[registerFormKeys.Password]}
							onMouseEnter={() => handleMouse(registerFormKeys.Password, true)}
							onMouseLeave={() => handleMouse(registerFormKeys.Password, false)}
						/>
						{showTooltip[registerFormKeys.Password] && <div className="tooltip">Enter your password!</div>}

					</div>
					<div className='input-container'>
						<label htmlFor="conf-pass" className="vhide">Confirm Password:</label>
						<input
							id="conf-pass"
							className="confPass"
							name={registerFormKeys.ConfirmPassword}
							type="password"
							placeholder="Confirm Password"
							onChange={onChange}
							value={values[registerFormKeys.ConfirmPassword]}
							onMouseEnter={() => handleMouse(registerFormKeys.ConfirmPassword, true)}
							onMouseLeave={() => handleMouse(registerFormKeys.ConfirmPassword, false)}
						/>
						{showTooltip[registerFormKeys.ConfirmPassword] && <div className="tooltip">Confirm your password!</div>}
					</div>
					<div className='input-container'>

						<label htmlFor="username" className="vhide">Username</label>
						<input
							id="username"
							className="username"
							name={registerFormKeys.Username}
							type="text"
							placeholder="Username"
							onChange={onChange}
							value={values[registerFormKeys.Username]}
							onMouseEnter={() => handleMouse(registerFormKeys.Username, true)}
							onMouseLeave={() => handleMouse(registerFormKeys.Username, false)}
						/>
						{showTooltip[registerFormKeys.Username] && <div className="tooltip">Enter your username!</div>}

					</div>
					<div className='input-container'>
						<label htmlFor="fullName" className="vhide">Account Name</label>
						<input
							id="fullName"
							className="fullName"
							name={registerFormKeys.FullName}
							type="text"
							placeholder="Full Name"
							onChange={onChange}
							value={values[registerFormKeys.FullName]}
							onMouseEnter={() => handleMouse(registerFormKeys.FullName, true)}
							onMouseLeave={() => handleMouse(registerFormKeys.FullName, false)}
						/>
						{showTooltip[registerFormKeys.FullName] && <div className="tooltip">Enter your full name!</div>}

					</div>
					<div className='input-container'>

						<label htmlFor="imgUrl" className="vhide">Account Name</label>
						<input
							id="imgUrl"
							className="imgUrl"
							name={registerFormKeys.ImgUrl}
							type="text"
							placeholder="Image Url"
							onChange={onChange}
							value={values[registerFormKeys.ImgUrl]}
							onMouseEnter={() => handleMouse(registerFormKeys.ImgUrl, true)}
							onMouseLeave={() => handleMouse(registerFormKeys.ImgUrl, false)}
						/>
						{showTooltip[registerFormKeys.ImgUrl] && <div className="tooltip">Enter your imgUrl!</div>}

					</div>
					<div className='input-container'>

						<label htmlFor="description" className="vhide">Description</label>
						<textarea
							id="description"
							className="description"
							name={registerFormKeys.Description}
							type="text"
							placeholder="Description"
							onChange={onChange}
							value={values[registerFormKeys.Description]}
							onMouseEnter={() => handleMouse(registerFormKeys.Description, true)}
							onMouseLeave={() => handleMouse(registerFormKeys.Description, false)}
						/>
						{showTooltip[registerFormKeys.Description] && <div className="tooltip">Enter your Description!</div>}

					</div>

					<button type="submit" className="register">Register</button>

					<ErrorMessage error={error}/>

					<p className="field">
						<span>If you already have profile click <Link to={Path.Login}>here</Link></span>
					</p>
				</fieldset>
			</form>
		</section>
	)
}