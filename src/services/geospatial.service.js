const geospatialRepository = require("./../repositories/geospatial.repository");
//
async function Coordinates(){
	try{
	const coordinates = await geospatialRepository.Coordinates();
	return coordinates;
	}
	catch(error){
		console.log(error);
	}
}
//
async function getCoordinates(username){
	try{
		const coordinates = await geospatialRepository.getCoordinates(username);
		return coordinates;
	}
	catch(error){
		console.log(error);
	}
}
//
async function Citizens(){
	try{
		const citizens = await geospatialRepository.Citizens();
		return citizens;
		
	}
	catch(error){
		console.log(error);
	}
}
//
async function getBase(){
	try{
		const base = await geospatialRepository.getBase();
		return base;
	}
	catch(error){
		console.log(error);
	}
}
//
async function getVehicle(username){
	try{
		const vehicle = await geospatialRepository.getVehicle(username);
		return vehicle;
	}
	catch(error){
		console.log(error);
	}
}
//

async function changeBase(latitude,longitude){
	try{

		const results = await geospatialRepository.changeBase(latitude,longitude);
		if(results.affectedRows>0){
		console.log('Changed base cords succesfully!');
		}
		else{
		console.log('Base cords didnt change');
			}
	}
	catch(error){
		console.log(error);
	}
}
//
async function getVehicles(){
	try{
	//
	let task_free_vehicles;
	let task_busy_vehicles;
	//
	let results = await geospatialRepository.getTaskBusyVehicles();
	task_busy_vehicles = results;
	//
	results = await geospatialRepository.getTaskFreeVehicles();
	task_free_vehicles = results;
	//
	return [task_free_vehicles,task_busy_vehicles];
	//
	}
	catch(error){
		console.log(error);
	}
}
//
async function updateVehicle(username,latitude,longitude){
	try{

	const results = await geospatialRepository.updateVehicle(username,latitude,longitude);
	if(results.affectedRows>0){
	console.log('Changed Vehicle position successfully!');
	return {msg:"OK !"};
	}
	else{
	console.log('Failed to change vehicle\'s position!');
	return {msg:"Error !"};
	}
	}
	catch(error){
		console.log(error);
	}
}
//
module.exports = {Coordinates,getCoordinates,Citizens,getBase,getVehicle,changeBase,getVehicles,updateVehicle};