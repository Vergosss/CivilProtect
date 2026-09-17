const announcementRepository = require("./../repositories/announcement.repository");
//
async function getAnnouncements(){
	try{
	const announcements = await announcementRepository.getAnnouncements();
	return announcements;
	}
	catch(error){
		console.log(error);
	}
}
//
async function createAnnouncement(text,items){
	try{
		const results = await announcementRepository.createAnnouncement(text,items);
		if(results.affectedRows>0){
			return {msg:'Successfully created announcement!'};
		}
		else{
			return {msg:'Failed to create announcement!'};
		}
	}
	catch(error){
		console.log(error);
	}
}
//
module.exports = {getAnnouncements,createAnnouncement};