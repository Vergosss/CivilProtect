const requestRepository = require("./../repositories/request.repository");
const userRepository = require("./../repositories/user.repository");
const taskRepository = require("./../repositories/task.repository");
//

async function Request(username,item,quantity){
	
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
		const insertRequest = await requestRepository.Request(citizen_first_name,citizen_last_name,citizen_telephone,item,quantity,latitude,longitude,username);
		if(insertRequest.affectedRows>0){
				console.log('Request submitted successfully!');
				//
				return {msg:"Success !"};
			}
			else{
				console.log('Request failed');
				//
				return {msg:"Failure !"};
			}
	}
	catch(error){
		console.log(error);
	}
}
//
async function getRequests(username){
	
	try{

	const requests = await requestRepository.getRequests(username);
	return requests;
	}
	catch(error){
		console.log(error);
	}
}
//
async function fetchRequests(){
	
	try{
		const requests = await requestRepository.fetchRequests();
		return requests;
	}
	catch(error){
		console.log(error);
	}
}
//
async function receiveRequests(username){
	
	try{
	
		let untaken_requests;
		let taken_requests;
		let completed_requests;
		//
		let results = await requestRepository.getUntakenRequests(username);
		//get free offers
		untaken_requests = results;
		//get offers that have been taken by a rescuer
		results = await requestRepository.getTakenRequests(username);
		//
		taken_requests = results;
		//get completed requests	kai to complete date
		results = await taskRepository.getCompletedRequests(username);
		completed_requests=results;
		//
		return [untaken_requests,taken_requests,completed_requests];
	
	
	
	}
	catch(error){
		console.log(error);
	}
}

//
module.exports = {Request,getRequests,fetchRequests,receiveRequests};