const User = require("../models/User");
const Task = require("../models/Task");

const registerUser = (req, res) => {
	let username = req.body.username;
	
	User.findOne({username: username}).then((user) => {
		if (user) {
				res.json({
					username: user.username,
					_id: user.id
			});
		} else {
			let newUser = new User({username});
			newUser
				.save()
				.then(res.json({
					username: newUser.username,
					_id: newUser.id
				}))
				.catch((err) => console.log(err));
		}
	});
	
};

const getUsers = (req, res) => {
	User.find({})
		.then((users) => {
			var userArr = [];
			var userCounter = 0;
			
			users.forEach(function(user) {
				userArr[userCounter] = {
					username: user.username,
					_id: user._id
				};
				userCounter += 1;
			});
			
			res.send(userArr);
		})
		.catch((err) => console.log(err));
}

const createTask = (req, res) => {
	User.findOne({_id: req.params.userId})
	.then((user) => {
		if (user) {
			
			let newDate = Date.now();
			
			if (req.body.date) {
				newDate = Date.parse(req.body.date);
			}
			
			let newTask = new Task({
				userID: req.params.userId,
				description: req.body.description,
				duration: parseInt(req.body.duration),
				date: newDate
			});
	
			newTask
				.save()
				.then(res.json({
					username: user.username,
					description: newTask.description,
					duration: newTask.duration,
					date: newTask.date.toDateString(),
					_id: user._id
				}))
				.catch((err) => console.log(err));
			
		}
		else {
			res.send("UserId not found");
		}
	})
	.catch((err) => console.log(err));
};

const getTasks = (req, res) => {
	User.findOne({_id: req.params.userId})
	.then((user) => {
		if (user) {
				
				//task find parameters - limit specified
				var reqCount = 0;
				if (req.query.limit) {
					var reqCount = parseInt(req.query.limit);
				}
				
				var findQuery = {userID: user._id};
				var findOptions = {limit: reqCount};
				
				//task find parameters - dates
				
				if (req.query.from) {
					var from = Date.parse(req.query.from);
					var dateNow = Date.now();
					
					findQuery = {
						userID: user._id,
						date: { $gte: from }
					};
					
					if (req.query.to) {
						var to = Date.parse(req.query.to);
						findQuery = {
							userID: user._id,
							date: {$gte:from, $lte:to}
						};
					}
				}
				
				// executing task
				
				Task.find(findQuery, null, findOptions)
					.then((tasks) => {
						//log organizer

							var logsArr = [];
							var logsCounter = 0;
						
							tasks.forEach(function(task) {
								logsArr[logsCounter] = {
									description: task.description,
									duration: task.duration,
									date: task.date.toDateString()
								};
								logsCounter += 1;
							});
							
							res.json({
								username: user.username,
								count: logsArr.length,
								_id: user._id,
								log: logsArr							
							});

						//end log organizer
					})
					.catch((err) => console.log(err));
		}
		else {
			res.send("UserId not found");
		}
	})
	.catch((err) => console.log(err));
};

module.exports = {
	registerUser,
	getUsers,
	createTask,
	getTasks
};