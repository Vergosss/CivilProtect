const connection = require("./../config/db");
//
async function getUntakenOffers(username){
	try{
		const [results] = await connection.promise().query('SELECT item,quantity FROM Request WHERE username=? AND type="Offer" AND lifted=0',[username]);
		return results;
	}
	catch(error){
		console.log(error);
	}
	
}
//
async function getTakenOffers(username){
	try{
	const [results] = await connection.promise().query('SELECT item,quantity,withdrawal_date FROM Request WHERE username=? AND lifted=1 AND type="Offer"',[username]);
	return results;
	}
	catch(error){
		console.log(error);
	}
}

async function Offer(citizen_first_name,citizen_last_name,citizen_telephone,item,quantity,latitude,longitude,username){
	try{
	
	const [results] = await connection.promise().query('INSERT INTO Request(citizen_first_name,citizen_last_name,citizen_telephone,entry_date,item,quantity,cords,username,type) VALUES(?,?,?,NOW(),?,?,POINT(?,?),?,"Offer")',[citizen_first_name,citizen_last_name,citizen_telephone,item,quantity,latitude,longitude,username]);
	return results;
	}
	catch(error){
		console.log(error);
	}
}
//
async function getNewOffersTo(end){
	try{
	const [results] = await connection.promise().query('SELECT DATE(entry_date) as Date,count(request_id) as offers FROM Request WHERE DATE(entry_date)<? AND type="Offer" group by DATE(entry_date)',[end]);
	return results
	}
	catch(error){
		console.log(error);
	}
	
}
//
async function getNewOffersFrom(start){
	
	try{
		const [results] = await connection.promise().query('SELECT DATE(entry_date) as Date,count(request_id) as offers FROM Request WHERE DATE(entry_date)>? AND type="Offer" group by DATE(entry_date)',[start]);
		return results;
	}
	catch(error){
		console.log(error);
	}
}
//
async function getNewOffersBetween(start,end){
	try{
	const [results] = await connection.promise().query('SELECT DATE(entry_date) as Date,count(request_id) as offers FROM Request WHERE DATE(entry_date) BETWEEN ? AND ? AND type="Offer" group by DATE(entry_date)',[start,end]);
	return results;
	}
	catch(error){
		console.log(error);
	}
	
}
//
module.exports = {getUntakenOffers,getTakenOffers,Offer,getNewOffersTo,getNewOffersFrom,getNewOffersBetween};