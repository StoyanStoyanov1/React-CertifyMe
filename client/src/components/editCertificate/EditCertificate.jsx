import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as certificateService from "../../services/certificateService.js";
import Path from "../../paths.js";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

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
	const { certificateId } = useParams();

	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState( null)

	const [certificateValues, setCertificateValues] = useState({
		title: "",
		start: "",
		end: "",
		university: "",
		imgUrl: "",
		description: "",
	});

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

	const onChange = (e) => {
		setCertificateValues((state) => ({
			...state,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		const certificateData = Object.fromEntries(new FormData(e.currentTarget));

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
						<label htmlFor="title" className="vhide">
							Title
						</label>
						<input
							id="title"
							name="title"
							className="title"
							type="text"
							placeholder="Title"
							value={certificateValues[EditCertificateFormKeys.Title]}
							onChange={onChange}
						/>

						<div className="date-container">
							<div className="input-container">
								<label htmlFor="start" className="vhide">Start</label>
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
							</div>

							<div className="input-container">
								<label htmlFor="end" className="vhide">End</label>
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
							</div>
						</div>

						<label htmlFor="university" className="vhide">
							University
						</label>
						<input
							id="university"
							name="university"
							className="university"
							type="text"
							placeholder="University"
							value={certificateValues[EditCertificateFormKeys.University]}
							onChange={onChange}
						/>

						<label htmlFor="imgUrl" className="vhide">
							Image Url
						</label>
						<input
							id="imgUrl"
							name="imgUrl"
							className="imgUrl"
							type="text"
							placeholder="Image Url"
							value={certificateValues[EditCertificateFormKeys.ImgUrl]}
							onChange={onChange}
						/>

						<label htmlFor="description" className="vhide">
							Description
						</label>
						<textarea
							name="description"
							className="description"
							placeholder="Description"
							value={certificateValues[EditCertificateFormKeys.Description]}
							onChange={onChange}
						></textarea>

						<button className="edit-item" type="submit">
							Edit Certificate
						</button>
					</div>
				</fieldset>
			</form>
		</section>
	);
}