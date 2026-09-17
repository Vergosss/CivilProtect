const requestRepository = require("./../repositories/request.repository");
const offerRepository = require("./../repositories/offer.repository");
const taskRepository = require("./../repositories/task.repository");
//
async function Graph(){
	try{
	const graph = await requestRepository.Graph();
	return graph;
	}
	catch(error){
		console.log(error);
	}
}
//
async function getDates(start,end){
	try{

	let new_requests;
	let new_offers;
	let completed_requests;
	let completed_offers;
	//
	if(start && end){
		//queries me between
			let results = await requestRepository.getNewRequestsBetween(start,end);
			new_requests = results;
			
			//
			results = await offerRepository.getNewOffersBetween(start,end);
			new_offers=results;
			//
			results = await taskRepository.getCompletedRequestsBetween(start,end);
			//
			completed_requests = results;
			//
			results = await taskRepository.getCompletedOffersBetween(start,end);
			//
			completed_offers = results;
		}//kai oi dyo hmeromhnies einai ok
		
		else if(start && !end){
		//queries me date()>?
			let results = await requestRepository.getNewRequestsFrom(start);
			new_requests = results;
			
			//
			results = await offerRepository.getNewOffersFrom(start);
			new_offers=results;
			//
			results = await taskRepository.getCompletedRequestsFrom(start);
			//
			completed_requests = results;
			//
			results = await taskRepository.getCompletedOffersFrom(start);
			//
			completed_offers = results;
		}
		else if(!start && end){
		//queries me date()<?
		
			let results = await requestRepository.getNewRequestsTo(end);
			new_requests = results;
			
			//
			results = await offerRepository.getNewOffersTo(end);
			new_offers=results;
			//
			results = await taskRepository.getCompletedRequestsTo(end);
			//
			completed_requests = results;
			//
			results = await taskRepository.getCompletedOffersTo(end);
			//
			completed_offers = results;
		}
	//
	return [new_requests,new_offers,completed_requests,completed_offers];



	}
	catch(error){
		console.log(error);
	}
}
//
module.exports = {Graph,getDates} ;