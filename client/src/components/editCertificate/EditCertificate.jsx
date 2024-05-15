import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import * as certificateService from "../../services/certificateService.js"
import Path from "../../paths.js";

const EditCertificateFormKeys = {
	Title: 'title',
	Start: 'start',
	End: 'end',
	University: 'university',
	ImgUrl: 'imgUrl',
	Description: 'description',
}

export default function EditCertificate() {
	const navigation = useNavigate();

	const {certificateId} = useParams();

	const [certificateValues, setCertificateValues] = useState({});

	useEffect(() => {
		certificateService.getOne(certificateId).then(result => setCertificateValues(result));
	}, [certificateId]);

	const onChange = (e) => {
		setCertificateValues(state => ({
			...state,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		try{
			await certificateService.edit(certificateId, certificateValues);
			navigation(Path.MyCertificates)
		} catch (err) {
			console.log(err)
		}

	};

	return (
		<section className="editPage">
			<form onSubmit={onSubmit}>
				<fieldset>
					<legend>Edit Certificate</legend>

					<div className="container">
						<label htmlFor="title" className="vhide">Title</label>
						<input
							id="title"
							name="title"
							className="title"
							type="text"
							placeholder="Title"
							value={certificateValues[EditCertificateFormKeys.Title]}
							onChange={onChange}
						/>

						<label htmlFor="start" className="vhide">Start</label>
						<input
							id="start"
							name="start"
							className="start"
							type="text"
							placeholder="Start"
							value={certificateValues[EditCertificateFormKeys.Start]}
							onChange={onChange}
						/>

						<label htmlFor="end" className="vhide">End</label>
						<input
							id="end"
							name="end"
							className="end"
							type="text"
							placeholder="End"
							value={certificateValues[EditCertificateFormKeys.End]}
							onChange={onChange}
						/>

						<label htmlFor="university" className="vhide">University</label>
						<input
							id="university"
							name="university"
							className="university"
							type="text"
							placeholder="University"
							value={certificateValues[EditCertificateFormKeys.University]}
							onChange={onChange}
						/>

						<label htmlFor="imgUrl" className="vhide">Image Url</label>
						<input
							id="imgUrl"
							name="imgUrl"
							className="imgUrl"
							type="text"
							placeholder="Image Url"
							value={certificateValues[EditCertificateFormKeys.ImgUrl]}
							onChange={onChange}
						/>

						<label htmlFor="description" className="vhide">Description</label>
						<textarea
							name="description"
							className="description"
							placeholder='Description'
							value={certificateValues[EditCertificateFormKeys.Description]}
							onChange={onChange}
						>

						</textarea>

						<button className="edit-album" type="submit">Edit Certificate</button>
					</div>
				</fieldset>
			</form>
		</section>

	)
}