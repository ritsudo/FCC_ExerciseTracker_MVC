const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
	userID: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	duration: {
		type: Number,
		required: true
	},
	date: {
		type: Date,
		required: true
	}
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;