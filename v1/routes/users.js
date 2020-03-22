const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');

const Auth = require('../middleware/auth');
const Permission = require('../middleware/check_permission');

router.get('/', UserController.getAllUser);

router.get('/aco', Auth, UserController.getAllAco);

router.get('/bp', UserController.getAllBp);

router.get('/:id',Auth, UserController.getDetailsOfUser);

router.post('/', Auth, UserController.createUser);

router.put('/:id', UserController.updateUser);

router.delete('/:id', Auth, UserController.deleteUser);

router.post('/login', UserController.loginUser);

// router.post('/insall', UserController.insertAlluser)

module.exports = router;
