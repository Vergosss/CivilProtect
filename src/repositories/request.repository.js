const connection = require("./../config/db");
//
async function liftRequest(vehicle_username,username,task_id){
	try{
	const [results] = await connection.promise().query('UPDATE Request SET lifted=true,vehicle_username=?,withdrawal_date=NOW() WHERE username=? AND request_id=?',[vehicle_username,username,task_id]);
	return results;
	}
	catch(error){
		console.log(error);
	}
}
//
async function getRequests(vehicle_username){
	
	try{

	const [results] = await connection.promise().query('SELECT request_id,username,citizen_first_name,citizen_last_name,citizen_telephone,entry_date,item,quantity,ST_X(cords),ST_Y(cords),lifted,type FROM Request WHERE lifted=false OR vehicle_username=?',[vehicle_username]);
	return results;
	}
	catch(error){
		console.log(error);
	}
	
	
}
//

async function deleteRequest(tid){
	
		try{

		const [results] = await connection.promise().query('DELETE FROM Request WHERE request_id=?',[tid]);
		return results;
		}
		catch(error){
			console.log(error);
		}
	
}
//
async function updateRequest(vehicle_username,tid){
	try{
	
	const [results] = await connection.promise().query('UPDATE Request SET lifted=0,vehicle_username=NULL,withdrawal_date=NULL where vehicle_username=? AND request_id=?',[vehicle_username,tid]);
	return results;
	}
	catch(error){
		console.log(error);
	}
}
//

async function Request(citizen_first_name,citizen_last_name,citizen_telephone,item,quantity,latitude,longitude,username){
	try{
	
	const [results] = await connection.promise().query('INSERT INTO Request(citizen_first_name,citizen_last_name,citizen_telephone,entry_date,item,quantity,cords,username,type) VALUES(?,?,?,NOW(),?,?,POINT(?,?),?,"Request")',[citizen_first_name,citizen_last_name,citizen_telephone,item,quantity,latitude,longitude,username]);
	return results;
	}
	catch(error){
		console.log(error);
	}
}
//
async function fetchRequests(){
	
	try{
		const [results] = await connection.promise().query('SELECT username,citizen_first_name,citizen_last_name,citizen_telephone,entry_date,item,quantity,withdrawal_date,vehicle_username,ST_X(cords),ST_Y(cords),lifted,type FROM Request');
		return results;
	}
	catch(error){
		console.log(error);
	}
}
//
async function getUntakenRequests(username){
	try{
		const [results] = await connection.promise().query('SELECT item,quantity FROM Request WHERE username=? AND type="Request" AND lifted=0',[username]);
		return results;
	}
	catch(error){
		console.log(error);
	}
	
}
//
async function getTakenRequests(username){
	try{
	const [results] = await connection.promise().query('SELECT item,quantity,withdrawal_date FROM Request WHERE username=? AND lifted=1 AND type="Request"',[username]);
	return results;
	}
	catch(error){
		console.log(error);
	}
}
//
async function Graph(){
	
	try{
	const [results] = await connection.promise().query('SELECT DATE(entry_date) as Date,count(request_id) as requests FROM Request group by DATE(entry_date)');
	return results;
	}
	catch(error){
		console.log(error);
	}
}
//
async function getNewRequestsBetween(start,end){
	try{
	const [results] = await connection.promise().query('SELECT DATE(entry_date) as Date,count(request_id) as requests FROM Request WHERE DATE(entry_date) BETWEEN ? AND ? AND type="Request" group by DATE(entry_date)',[start,end]);
	return results;
	}
	catch(error){
		console.log(error);
	}
	
}
//

//
async function getNewRequestsFrom(start){
	
	try{
		const [results] = await connection.promise().query('SELECT DATE(entry_date) as Date,count(request_id) as requests FROM Request WHERE DATE(entry_date)>? AND type="Request" group by DATE(entry_date)',[start]);
		return results;
	}
	catch(error){
		console.log(error);
	}
}
//

//
async function getNewRequestsTo(end){
	try{
		const [results] = await connection.promise().query('SELECT DATE(entry_date) as Date,count(request_id) as requests FROM Request WHERE DATE(entry_date)<? AND type="Request" group by DATE(entry_date)',[end]);
		return results;
	}
	catch(error){
		console.log(error);
	}
}
//



//
module.exports = {liftRequest,getRequests,deleteRequest,updateRequest,Request,fetchRequests,getUntakenRequests,getTakenRequests,Graph,getNewRequestsBetween,getNewRequestsFrom,getNewRequestsTo};