const router = require('express').Router();
// Controllers
const signinController = require('../controllers/signin');

router.post('/', signinController.signinAuthentication);

module.exports = router;