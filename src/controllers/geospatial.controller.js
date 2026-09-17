const geospatialService = require("./../services/geospatial.service");
//
async function Coordinates(req,res){
	
	try{
		const results = await geospatialService.Coordinates();
		res.send(results);
	}
	catch(error){
		console.log(error);
	}
}
//
async function getCoordinates(req,res){
	try{
		const username = req.session.username;
		const results = await geospatialService.getCoordinates(username);
		res.send(results);
	}
	catch(error){
		console.log(error);
	}
}
//
async function Citizens(req,res){
	try{
		const results = await geospatialService.Citizens();
		res.send(results);
	}
	catch(error){
		console.log(error);
	}
}
//
async function getBase(req,res){
	try{
		const results = await geospatialService.getBase();
		res.send(results);
	}
	catch(error){
		console.log(error);
	}
}
//
async function getVehicle(req,res){
	try{
		const username = req.session.username;
		const results = await geospatialService.getVehicle(username);
		res.send(results);
	}
	catch(error){
		console.log(error);
	}
}
//
async function changeBase(req,res){
	try{
		const latitude = req.body.latitude;
		const longitude = req.body.longitude;
		await geospatialService.changeBase(latitude,longitude);
	}
	catch(error){
		console.log(error);
	}
}
//
async function getVehicles(req,res){
	try{

	const results = await geospatialService.getVehicles();
	res.send(results);
	}
	catch(error){
		console.log(error);
	}
}
//
async function updateVehicle(req,res){
	try{
	const latitude = req.body.latitude;
	const longitude = req.body.longitude;
	const username = req.session.username;
	const msg = await geospatialService.updateVehicle(username,latitude,longitude);
	res.json(msg);
	}
	catch(error){
		console.log(error);
	}
}
//
module.exports = {Coordinates,getCoordinates,Citizens,getBase,getVehicle,changeBase,getVehicles,updateVehicle};