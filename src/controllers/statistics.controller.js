const statisticsService = require("./../services/statistics.service");
//
async function Graph(req,res){
	try{
	const results = await statisticsService.Graph();
	res.send(results);
	}
	catch(error){
		console.log(error);
	}
}
//
async function getDates(req,res){
	try{
	const start = req.body.start;
	const end = req.body.end;
	const results = await statisticsService.getDates(start,end);
	res.send(results);
	}
	catch(error){
		console.log(error);
	}
}
//
module.exports = {Graph,getDates} ;