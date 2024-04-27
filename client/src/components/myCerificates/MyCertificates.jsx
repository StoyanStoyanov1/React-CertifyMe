export default function MyCertificates() {
	return (
		<section id="catalogPage">
			<h1>My certificates</h1>

			<div className="card-box">
				<img src="https://softuni.bg/certificates/certificates/converttoimage/213277?code=ebb71c54" alt='Python OOP`'/>
					<div>
						<div className="text-center">
							<p className="name">Name: Kiril Madzharov</p>
							<p className="title">Title: Python OOP</p>
							<p className="artist">Date: 10.10.2020 - 10.10.2022</p>
							<p className="university">University: Soft Uni</p>
						</div>
						<div className="btn-group">
							<a href="#" id="details">Details</a>
						</div>
					</div>
			</div>

			{/*<p>No found certificates!</p>*/}
		</section>
	)
}