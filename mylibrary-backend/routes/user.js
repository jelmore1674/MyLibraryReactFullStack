const router = require('express').Router();

//controllers
const userController = require('../controllers/user');

router.get('/:id', userController.getSingleUser);

module.exports = router;