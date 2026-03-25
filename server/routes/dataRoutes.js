const express = require('express');
const router = express.Router();
const { getUsers, addUsers, deleteUsers } = require('../controllers/dataController');

router.get('/users', getUsers);
router.post('/users', addUsers);
router.delete('/users', deleteUsers);

module.exports = router;
