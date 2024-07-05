import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import * as certificateService from "../../services/certificateService.js";
import Path from "../../paths.js";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import validator from "../addCertificate/validator.js";

const EditCertificateFormKeys = {
	Title: "title",
	Start: "start",
	End: "end",
	University: "university",
	ImgUrl: "imgUrl",
	Description: "description",
};

export default function EditCertificate() {
	const navigation = useNavigate();
	const {certificateId} = useParams();

	const validateObjects = {
		title: false,
		start: false,
		end: false,
		university: false,
		imgUrl: false,
		description: false,
	}

	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null)

	const [certificateValues, setCertificateValues] = useState({
		title: "",
		start: "",
		end: "",
		university: "",
		imgUrl: "",
		description: "",
	});

	const [validated, setValidated] = useState(validateObjects);

	useEffect(() => {
		certificateService.getOne(certificateId).then((result) => {
			setCertificateValues({
				title: result.title || "",
				start: result.start || null,
				end: result.end || null,
				university: result.university || "",
				imgUrl: result.imgUrl || "",
				description: result.description || "",
			});
		});

		setStartDate(certificateValues.start);
		setEndDate(certificateValues.end);
	}, [certificateId]);

	const [showTooltip, setShowTooltip] = useState(validateObjects);

	const onChange = (e) => {
		setCertificateValues((state) => ({
			...state,
			[e.target.name]: e.target.value,
		}));
	};

	const handleMouse = (key, boolean) => {
		setShowTooltip(prevState => ({...prevState, [key]: boolean}));
	}

	const onSubmit = async (e) => {
		e.preventDefault();
		setValidated(validateObjects);

		const certificateData = Object.fromEntries(new FormData(e.currentTarget));

		const key = validator(certificateData);

		if (key) {
			return setValidated(prevState => ({...prevState, [key]: true}));
		}

		try {
			await certificateService.edit(certificateId, certificateData);
			navigation(`${Path.MyCertificates}/${certificateId}/details`);
		} catch (err) {
			console.log(err);
		}
	};


	return (
		<section className="editPage">
			<form onSubmit={onSubmit}>
				<fieldset>
					<legend>Edit Certificate</legend>

					<div className="container">
						<div className='input-container'>
							<label htmlFor="title" className="vhide">
								Title
							</label>
							{validated.title && <div className='error-message'>Title must be between 2 and 20 characters!</div>}

							<input
								id="title"
								name="title"
								className="title"
								type="text"
								placeholder="Title"
								value={certificateValues[EditCertificateFormKeys.Title]}
								onChange={onChange}
								onMouseEnter={() => handleMouse('title', true)}
								onMouseLeave={() => handleMouse('title', false)}
							/>

							{showTooltip.title && <div className='tooltip'>Add your Title</div>}
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
									value={startDate || certificateValues.start}
									onMouseEnter={() => handleMouseEnter('start')}
									onMouseLeave={() => handleMouseLeave('start')}
								/>
								{showTooltip.start && <div className='tooltip'>Enter the start date of the course</div>}

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
									value={endDate || certificateValues.end}
									onMouseEnter={() => handleMouseEnter('end')}
									onMouseLeave={() => handleMouseLeave('end')}
								/>
								{showTooltip.end && <div className='tooltip'>Enter the end date of the course</div>}

							</div>
						</div>
						<div className='input-container'>
						<label htmlFor="university" className="vhide">
							University
						</label>
							{validated.university && <div className='error-message'>University muss be between 2 and 10 characters!</div>}

							<input
							id="university"
							name="university"
							className="university"
							type="text"
							placeholder="University"
							value={certificateValues[EditCertificateFormKeys.University]}
							onChange={onChange}
							onMouseEnter={() => handleMouse('university', true)}
							onMouseLeave={() => handleMouse('university', false)}
						/>
							{showTooltip.university && <div className='tooltip'>Add your University!</div>}

						</div>
						<div className='input-container'>
						<label htmlFor="imgUrl" className="vhide">
							Image Url
						</label>
							{validated.imgUrl && <div className='error-message'>Url must start with http:// or https://</div>}

							<input
							id="imgUrl"
							name="imgUrl"
							className="imgUrl"
							type="text"
							placeholder="Image Url"
							value={certificateValues[EditCertificateFormKeys.ImgUrl]}
							onChange={onChange}
							onMouseEnter={() => handleMouse('imgUrl', true)}
							onMouseLeave={() => handleMouse('imgUrl', false)}
						/>
						{showTooltip.imgUrl && <div className='tooltip'>Add your ImgUrl!</div>}
						</div>

						<div className='input-container'>
						<label htmlFor="description" className="vhide">
							Description
						</label>
						<textarea
							name="description"
							className="description"
							placeholder="Description"
							value={certificateValues[EditCertificateFormKeys.Description]}
							onChange={onChange}
							onMouseEnter={() => handleMouse('description', true)}
							onMouseLeave={() => handleMouse('description', false)}
						></textarea>
							{showTooltip.description && <div className='tooltip'>Add your Description!</div>}

						</div>
						<button className="edit-item" type="submit">
							Edit Certificate
						</button>
					</div>
				</fieldset>
			</form>
		</section>
	);
}