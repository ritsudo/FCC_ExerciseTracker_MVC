const express = require("express");

const {
	registerUser,
	createTask,
	getTasks,
	getUsers
} = require("../controllers/taskController");

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html')
});

router.post('/api/users', registerUser);
router.post('/api/users/:userId/exercises', createTask);
router.get('/api/users/:userId/logs', getTasks);
router.get('/api/users', getUsers);

module.exports = router;