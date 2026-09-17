const connection = require("./../config/db");
//
async function Coordinates(){
	try{
	const [results] = await connection.promise().query('SELECT ST_X(cords),ST_Y(cords) FROM User WHERE role="Citizen"');
	return results;
	}
	catch(error){
		console.log(error);
	}
}
//
async function getCoordinates(username){
	try{
		const [results] = await connection.promise().query('SELECT ST_X(cords),ST_Y(cords) FROM User WHERE username=?',[username]);
		return results;
	}
	catch(error){
		console.log(error);
	}
}
//
async function Citizens(){
	try{
		const [results] = await connection.promise().query('SELECT username FROM User WHERE role="Citizen"');
		return results;
		
	}
	catch(error){
		console.log(error);
	}
}
//
async function getBase(){
	try{
		const [results] = await connection.promise().query('SELECT ST_X(cords),ST_Y(cords) FROM Base');
		return results;
	}
	catch(error){
		console.log(error);
	}
}
//
async function getVehicle(username){
	try{
		const [results] = await connection.promise().query('SELECT ST_X(cords),ST_Y(cords) FROM User WHERE role="Rescuer" AND username=?',[username]);
		return results;
	}
	catch(error){
		console.log(error);
	}
}
//
async function changeBase(latitude,longitude){
	try{
	
	const [results] = await connection.promise().query('UPDATE Base SET cords = POINT(?,?)',[latitude,longitude]);
	return results;
	}
	catch(error){
		console.log(error);
	}
}
//
async function getTaskBusyVehicles(){
	try{
	const [results] = await connection.promise().query('SELECT User.username,ST_X(cords),ST_Y(cords),item,quantity FROM User inner join Cargo on User.username = Cargo.username WHERE role="Rescuer" AND User.username IN(SELECT distinct vehicle_username from Request where vehicle_username is not null)');
	return results;
	}
	catch(error){
		console.log(error);
	}
}
//
async function getTaskFreeVehicles(){
	try{
	const [results] = await connection.promise().query('SELECT User.username,ST_X(cords),ST_Y(cords),item,quantity FROM User inner join Cargo on User.username = Cargo.username WHERE role="Rescuer" AND User.username NOT IN(SELECT distinct vehicle_username from Request where vehicle_username is not null)');
	return results;
	}
	catch(error){
		console.log(error);
	}
}
//
async function updateVehicle(username,latitude,longitude){
	
	try{
		
		const [results] = await connection.promise().query('UPDATE User SET cords=POINT(?,?) WHERE role="Rescuer" AND username=?',[latitude,longitude,username]);
		return results;
		
	}
	catch(error){
		console.log(error);
	}
}
//
module.exports = {Coordinates,getCoordinates,Citizens,getBase,getVehicle,changeBase,getTaskBusyVehicles,getTaskFreeVehicles,updateVehicle};