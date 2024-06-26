const router = require('express').Router();
const certificateServer = require('../service/certificateServer');
const profilService = require('../service/profilService');

router.post('/add-certificate', async (req, res) => {
	try {
		const data = req.body;
		const profilId = data.profilId;
		console.log(profilId)

		const certificate = await certificateServer.create(data);

		await profilService.pushCertificateInCertificatesList(profilId, certificate._id);

		res.status(201).json(certificate);
	} catch (err) {
		res.status(500).json({message: err})
	}
});


router.get('/all-certificate', async (req, res) => {
	try {
		const certificates = await certificateServer.getAll();

		res.status(200).json(certificates);
	} catch (err) {
		res.status(500).json({message: err});
	}
});

router.get('/:userId', async (req, res) => {
	try {
		const userId = req.params.userId;
		const profil = await profilService.getOneByUserId(userId);
		const profilId = profil._id;

		const certificates = await certificateServer.getAllByProfilId(profilId);

		res.status(200).json(certificates);
	} catch (err) {
		res.status(500).json({message: err});
	}
});

router.get('/:certificateId/details', async (req, res) => {
	try {
		const certificateId = req.params.certificateId;
		console.log(certificateId);
		const certificate = await certificateServer.getOne(certificateId);

		console.log(certificate)
		res.status(200).json(certificate);
	} catch (err) {
		res.status(500).json({message: 'Certificate is not found!'});
	}
});

router.put('/:certificateId', async (req, res) => {
	try {
		const certyificateId = req.params.certificateId;
		const data = req.body;

		const certificate = await certificateServer.edit(certyificateId, data);


		res.status(200).json(certificate);
	} catch (err) {
		res.status(500).json({message: 'Certificate is not found!'});
	}

})

module.exports = router;
