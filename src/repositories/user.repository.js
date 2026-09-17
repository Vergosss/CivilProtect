const connection = require("./../config/db");

async function insertCitizen(reg_username,hash,reg_first_name,reg_last_name,reg_telephone,reg_latitude,reg_longitude){
	try{
	const [result] = await connection.promise().query('INSERT IGNORE INTO User(username,password,first_name,last_name,telephone,cords,role) VALUES (?,?,?,?,?,POINT(?,?),"Citizen")',[reg_username,hash,reg_first_name,reg_last_name,reg_telephone,reg_latitude,reg_longitude]);
	return result;
	}
	catch(error){
		console.log(error);
	}
	
}
//
async function insertRescuer(reg_username,hash,reg_first_name,reg_last_name,reg_telephone,reg_latitude,reg_longitude){
	try{
	const [result] = await connection.promise().query('INSERT IGNORE INTO User(username,password,first_name,last_name,telephone,cords,role) VALUES (?,?,?,?,?,POINT(?,?),"Rescuer")',[reg_username,hash,reg_first_name,reg_last_name,reg_telephone,reg_latitude,reg_longitude]);
	return result;
	}
	catch(error){
		console.log(error);
	}
}
//
async function getUser(username){
	try{
		const [results] = await connection.promise().query('SELECT * FROM User WHERE username=?',[username]);
		return results;
	}
	catch(error){
		console.log(error);
	}
}
//

async function getCitizenInfo(username){
	try{
	const [results] = await connection.promise().query('SELECT first_name,last_name,telephone,ST_X(cords),ST_Y(cords) FROM User Where username=? and role="Citizen"',[username]);
	return results;
	}
	catch(error){
		console.log(error);
	}
}
//
module.exports = {insertCitizen,insertRescuer,getUser,getCitizenInfo};