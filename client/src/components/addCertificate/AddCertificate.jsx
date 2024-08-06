import { useNavigate } from "react-router-dom";
import * as certificateService from '../../services/certificateService.js';
import { useContext, useEffect, useState } from "react";
import authContext from "../../context/authContext.jsx";
import * as profilService from '../../services/profilService.js';
import Path from "../../paths.js";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import '../../../public/styles/create.css';
import validator from "./validator.js";

export default function AddCertificate() {
	// Initial validation states for form fields
	const validatedObjects = {
		title: false,
		start: false,
		end: false,
		university: false,
		imgUrl: false,
		description: false
	};

	const navigate = useNavigate();
	const { _id } = useContext(authContext);
	const [profil, setProfiles] = useState(null);
	const [showTooltip, setShowTooltip] = useState(validatedObjects);
	const [validated, setValidated] = useState(validatedObjects);
	const [isClicked, setIsClicked] = useState(false);

	// Fetch user profile data on component mount
	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await profilService.getByUserId(_id);
				setProfiles(result);
			} catch (error) {
				console.error('Error fetching user profile:', error);
			}
		};

		fetchData();
	}, [_id]);

	// Handle form submission for creating a certificate
	const createCertificateSubmitHandler = async (e) => {
		e.preventDefault();
		setValidated(validatedObjects);
		const profilId = profil._id;

		const certificateData = Object.fromEntries(new FormData(e.currentTarget));
		const validate = validator(certificateData);

		if (validate) {
			return setValidated(prevState => ({...prevState, [validate]: true}));
		}

		if (isClicked) {
			return ;
		}

		setIsClicked(true);
		try {
			await certificateService.create({...certificateData, profilId});
			navigate(`${Path.MyCertificates}/${_id}`);
		} catch (err) {
			setIsClicked(false);
			console.log(err);
		}
	}

	// State management for start and end dates
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);

	// Show tooltip on mouse enter
	const handleMouseEnter = (field, boolean) => {
		setShowTooltip(prevState => ({ ...prevState, [field]: true }));
	};

	// Hide tooltip on mouse leave
	const handleMouseLeave = (field) => {
		setShowTooltip(prevState => ({ ...prevState, [field]: false }));
	};

	return (
		<section className="createPage">
			<form onSubmit={createCertificateSubmitHandler}>
				<fieldset>
					<legend>Add Certificate</legend>
					<div className="container">

						<label htmlFor="title" className="vhide">Title</label>
						{validated.title && <div className='error-message'>Title must be between 2 and 20 characters!</div>}
						<div className="input-container">
							<input
								id="title"
								name="title"
								className="title input-field"
								type="text"
								placeholder="Title"
								onMouseEnter={() => handleMouseEnter('title')}
								onMouseLeave={() => handleMouseLeave('title')}
							/>
							{showTooltip.title && <div className="tooltip">Enter the title of the certificate</div>}
						</div>

						<div className="date-container">
							<div className="input-container">
								<label htmlFor="start" className="vhide">Start</label>
								{validated.start && <div className='error-message'>Date is not valid!</div>}
								<DatePicker
									selected={startDate}
									onChange={(date) => setStartDate(date)}
									dateFormat="dd.MM.yyyy"
									placeholderText="Start Date"
									name='start'
									className="title input-field"
									onMouseEnter={() => handleMouseEnter('start')}
									onMouseLeave={() => handleMouseLeave('start')}
								/>
								{showTooltip.start && <div className="tooltip">Enter the start date of the course</div>}
							</div>

							<div className="input-container">
								<label htmlFor="end" className="vhide">End</label>
								{validated.end && <div className='error-message'>The end date cannot be earlier than the start date.</div>}
								<DatePicker
									selected={endDate}
									onChange={(date) => setEndDate(date)}
									dateFormat="dd.MM.yyyy"
									placeholderText="End Date"
									name='end'
									className="title input-field"
									onMouseEnter={() => handleMouseEnter('end')}
									onMouseLeave={() => handleMouseLeave('end')}
								/>
								{showTooltip.end && <div className="tooltip">Enter the end date of the course</div>}
							</div>
						</div>

						<label htmlFor="university" className="vhide">University</label>
						{validated.university && <div className='error-message'>University must be between 2 and 10 characters!</div>}
						<div className="input-container">
							<input
								id="university"
								name="university"
								type="text"
								placeholder="University"
								className="title input-field"
								onMouseEnter={() => handleMouseEnter('university')}
								onMouseLeave={() => handleMouseLeave('university')}
							/>
							{showTooltip.university && <div className="tooltip">Enter the name of the university</div>}
						</div>

						<label htmlFor="imgUrl" className="vhide">Image Url</label>
						{validated.imgUrl && <div className='error-message'>URL must start with http:// or https://</div>}
						<div className="input-container">
							<input
								id="imgUrl"
								name="imgUrl"
								type="text"
								placeholder="Image Url"
								className="title input-field"
								onMouseEnter={() => handleMouseEnter('imgUrl')}
								onMouseLeave={() => handleMouseLeave('imgUrl')}
							/>
							{showTooltip.imgUrl && <div className="tooltip">Enter the URL of the image</div>}
						</div>

						<label htmlFor="description" className="vhide">Description</label>
						<div className="input-container">
                            <textarea
								name="description"
								placeholder="Description"
								className="description"
								onMouseEnter={() => handleMouseEnter('description')}
								onMouseLeave={() => handleMouseLeave('description')}
							></textarea>
							{showTooltip.description && <div className="tooltip">Enter the description of the certificate</div>}
						</div>

						<button className="add-item" type="submit">Add Certificate</button>
					</div>
				</fieldset>
			</form>
		</section>
	);
}
