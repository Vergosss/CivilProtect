const taskService = require("./../services/task.service");
//
async function createTask(req,res){
	
	try{
		const vehicle_username = req.session.username;
		const data = req.body;
		//
		const newtasks = await taskService.createTask(vehicle_username,data);
		res.send(newtasks);
	}
	catch(error){
		console.log(error);
	}
}
//
async function getTasks(req,res){
	
	try{
		const vehicle_username = req.session.username;
		//
		const results = await taskService.getTasks(vehicle_username);
		res.send(results);
	}
	catch(error){
		console.log(error);
	}
}
//

async function completeTask(req,res){
	
	try{
		const vehicle_username = req.session.username;
		const data = req.body;
		//
		const results = await taskService.completeTask(vehicle_username,data);
		res.send(results);
	}
	catch(error){
		console.log(error);
	}
}
//
async function cancelTask(req,res){
	
	try{
		const vehicle_username = req.session.username;
		const tid = req.body.tid;
		//
		const results = await taskService.cancelTask(vehicle_username,tid);
		res.send(results);
	}
	catch(error){
		console.log(error);
	}
}
//
module.exports = {createTask,getTasks,completeTask,cancelTask}; 
