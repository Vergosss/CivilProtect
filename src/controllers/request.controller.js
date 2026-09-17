const requestService = require("./../services/request.service");
//
async function Request(req,res){
	
	try{
		const username = req.session.username;
		const item = req.body.item;
		const quantity = req.body.quantity;
		const msg = await requestService.Request(username,item,quantity);
		res.json(msg);
	}
	catch(error){
		console.log(error);
	}
}
//
async function getRequests(req,res){
	
	try{
		const username = req.session.username;
		const results = await requestService.getRequests(username);
		res.send(results);
	}
	catch(error){
		console.log(error);
	}
}
//
async function fetchRequests(req,res){
	
	try{
		const results = await requestService.fetchRequests();
		res.send(results);
	}
	catch(error){
		console.log(error);
	}
}
//
async function receiveRequests(req,res){
	
	try{
		const username = req.session.username;
		const results = await requestService.receiveRequests(username);
		res.send(results);
	}
	catch(error){
		console.log(error);
	}
}
//
module.exports = {Request,getRequests,fetchRequests,receiveRequests};