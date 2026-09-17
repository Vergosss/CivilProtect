const announcementService = require("./../services/announcement.service");
//
async function getAnnouncements(req,res){
	try{
		const results = await announcementService.getAnnouncements();
		res.send(results);
	}
	catch(error){
		console.log(error);
	}	
}
//
async function createAnnouncement(req,res){
	try{
		const text = req.body.text;
		const items = req.body.items;
		console.log(text,items);
		const msg = await announcementService.createAnnouncement(text,items);
		res.json(msg);
	}
	catch(error){
		console.log(error);
	}
	
}
//
module.exports = {getAnnouncements,createAnnouncement};