const connection = require("./../config/db");
//
async function getAnnouncements(){
	try{
	const [results] = await connection.promise().query('SELECT * FROM Announcement');
	return results;
	}
	catch(error){
		console.log(error);
	}
}
//
async function createAnnouncement(text,items){
	try{
	const [results] = await connection.promise().query('INSERT INTO Announcement(text,items,create_date) VALUES(?,?,NOW())',[text,items]);
	return results;
	}
	catch(error){
		console.log(error);
	}
}
//
module.exports = {getAnnouncements,createAnnouncement};