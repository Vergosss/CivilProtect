const offerRepository = require("./../repositories/offer.repository");
const userRepository = require("./../repositories/user.repository");
const taskRepository = require("./../repositories/task.repository");
//
async function receiveOffers(username){
	
	try{
	let untaken_offers;
	let taken_offers;
	let completed_offers;

	
	let results = await offerRepository.getUntakenOffers(username);
	//get free offers
	untaken_offers = results;
	//get offers that have been taken by a rescuer
	results = await offerRepository.getTakenOffers(username);
		//
	taken_offers = results;
	//get completed offers	kai to complete date
	results = await taskRepository.getCompletedOffers(username);
	completed_offers=results;
	//
	return [untaken_offers,taken_offers,completed_offers];
	}
	catch(error){
		console.log(error);
	}
}
//
async function Offer(username,item,quantity){
	
	try{

	console.log(item,quantity);
	//
		let citizen_first_name,citizen_last_name,citizen_telephone,latitude,longitude;
		const results = await userRepository.getCitizenInfo(username);
		citizen_first_name = results[0].first_name;
		citizen_last_name = results[0].last_name;
		citizen_telephone = results[0].telephone;
		latitude = results[0]['ST_X(cords)'];
		longitude = results[0]['ST_Y(cords)'];
		//
		const insertOffer = await offerRepository.Offer(citizen_first_name,citizen_last_name,citizen_telephone,item,quantity,latitude,longitude,username);
		if(insertOffer.affectedRows>0){
				console.log('Offer submitted successfully!');
				//
				return {msg:"Success !"};
			}
			else{
				console.log('Offer failed');
				//
				return {msg:"Failure !"};
			}
	}
	catch(error){
		console.log(error);
	}
}
//
module.exports = {receiveOffers,Offer};