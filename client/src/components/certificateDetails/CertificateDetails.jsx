import Path from "../../paths.js";

export default function CertificateDetails() {
	return (
		<section id="detailsPage">
			<div className="wrapper">
				<div className="certificateCover">
					<img src="https://softuni.bg/certificates/certificates/converttoimage/213277?code=ebb71c54"
						 alt="certificate"/>
				</div>
				<div className="certificateInfo">
					<div className="certificateText">

						<h1>Kiril Madzhanov</h1>
						<h3>10.10.2020 - 10.10.2022</h3>
						<h4>Python OOP</h4>
						<h4>University: Soft Uni</h4>
						<h4>Note: 6.00/6.00</h4>
						<p>The 'Python OOP' course covers object-oriented programming (OOP) essentials, including
							classes, objects, abstraction, encapsulation, inheritance, and polymorphism. Students will
							explore design patterns, SOLID principles, iterators, generators, and decorators. The course
							also emphasizes unit testing and Test Driven Development (TDD).</p>
					</div>

					<div className="actionBtn">
						<a href={Path.EditCertificate} className="edit">Edit</a>
						<a href="#" className="remove">Delete</a>
					</div>
				</div>
			</div>
		</section>
	)
}