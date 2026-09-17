const connection = require("./../config/db");
//
async function insertTask(task_id,username,first_name,last_name,telephone,item,quantity,type,vehicle_username){
	try{
	const [results] = await connection.promise().query('INSERT INTO Task(task_id,username,citizen_first_name,citizen_last_name,citizen_telephone,entry_date,item,quantity,type,vehicle_username) VALUES (?,?,?,?,?,NOW(),?,?,?,?) ',[task_id,username,first_name,last_name,telephone,item,quantity,type,vehicle_username]);
	return results;
	}
	catch(error){
		console.log(error);
	}
}
//
async function getTasks(vehicle_username){
	
		try{
			const [results] = await connection.promise().query('SELECT citizen_first_name,citizen_last_name,citizen_telephone,entry_date,item,quantity,task_id,username,type FROM Task WHERE completed=false AND vehicle_username=?',[vehicle_username]);
			return results;
		}
		catch(error){
			console.log(error);
		}
}
//
async function completeTask(tid){
	try{
		const [results] = await connection.promise().query('UPDATE Task SET completed = 1,complete_date=NOW() WHERE task_id=?',[tid]);
		return results;
	}
	catch(error){
		console.log(error);
	}
}
//
async function deleteTask(tid){
	try{
		const [results] = await connection.promise().query('DELETE FROM Task WHERE task_id=?',[tid]);
		return results;
	}
	catch(error){
		console.log(error);
		
	}
}
//
async function getCompletedRequests(username){
	try{
		const [results] = await connection.promise().query('SELECT item,quantity,entry_date,complete_date FROM Task WHERE username=? AND type="Request" AND completed=1',[username]);
		return results;
	}
	catch(error){
		console.log(error);
	}
}
//
async function getCompletedOffers(username){
	try{
		const [results] = await connection.promise().query('SELECT item,quantity,entry_date,complete_date FROM Task WHERE username=? AND type="Offer" AND completed=1',[username]);
		return results;
	}
	catch(error){
		console.log(error);
	}
}
//
async function getCompletedRequestsBetween(start,end){
	
	try{
	const [results] = await connection.promise().query('SELECT DATE(complete_date) as Date,count(task_id) as requests FROM Task WHERE DATE(complete_date) BETWEEN ? AND ? AND type="Request" AND completed=1 group by DATE(complete_date)',[start,end]);	
	return results;
	}
	catch(error){
		console.log(error);
	}
}
//
async function getCompletedOffersBetween(start,end){
	
	try{
	const [results] = await connection.promise().query('SELECT DATE(complete_date) as Date,count(task_id) as offers FROM Task WHERE DATE(complete_date) BETWEEN ? AND ? AND type="Offer" AND completed=1 group by DATE(complete_date)',[start,end]);	
	return results;
	}
	catch(error){
		console.log(error);
	}
}
//
async function getCompletedRequestsFrom(start){
	try{
	const [results] = await connection.promise().query('SELECT DATE(complete_date) as Date,count(task_id) as requests FROM Task WHERE DATE(complete_date)>? AND type="Request" AND completed=1 group by DATE(complete_date)',[start]);
	return results;
	}
	catch(error){
		console.log(error);
	}
}
//
async function getCompletedOffersFrom(start){
	
	try{
	const [results] = await connection.promise().query('SELECT DATE(complete_date) as Date,count(task_id) as offers FROM Task WHERE DATE(complete_date)>? AND type="Offer" AND completed=1 group by DATE(complete_date)',[start]);
	return results;
	}
	catch(error){
		console.log(error);
	}
}
//
async function getCompletedRequestsTo(end){
	
	try{
	const [results] = await connection.promise().query('SELECT DATE(complete_date) as Date,count(task_id) as requests FROM Task WHERE DATE(complete_date)<? AND type="Request" AND completed=1 group by DATE(complete_date)',[end]);
	return results;
	}
	catch(error){
		console.log(error);
	}
}
//
async function getCompletedOffersTo(end){
	
	try{
	const [results] = await connection.promise().query('SELECT DATE(complete_date) as Date,count(task_id) as offers FROM Task WHERE DATE(complete_date)<? AND type="Offer" AND completed=1 group by DATE(complete_date)',[end]);
	return results;
	}
	catch(error){
		console.log(error);
	}
	
}
//
module.exports = {insertTask,getTasks,completeTask,deleteTask,getCompletedRequests,getCompletedOffers,getCompletedRequestsBetween,getCompletedOffersBetween,getCompletedRequestsFrom,getCompletedOffersFrom,getCompletedRequestsTo,getCompletedOffersTo};