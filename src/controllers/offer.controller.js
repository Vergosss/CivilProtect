const offerService = require("./../services/offer.service");
//
async function receiveOffers(req,res){
	
	try{
		const username = req.session.username;
		const offers = await offerService.receiveOffers(username);
		res.send(offers);
	}
	catch(error){
		console.log(error);
	}
}
//
async function Offer(req,res){
	
	try{
		const username = req.session.username;
		const item = req.body.item;
		const quantity = req.body.quantity;
		const msg = await offerService.Offer(username,item,quantity);
		res.json(msg);
	}
	catch(error){
		console.log(error);
	}
}
//
module.exports = {receiveOffers,Offer};