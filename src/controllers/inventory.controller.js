const inventoryService = require("./../services/inventory.service");
//
async function modifyInventory(req,res){
	
	try{
	
		const data = req.body;
		const results = await inventoryService.modifyInventory(data);
		res.send(results);
	}
	catch(error){
		console.log(error);
	}
}
//
async function updateCargo(req,res){
	
	try{
		const username = req.session.username;
		const cargo_load = req.body.add_cargo;
		const results = await inventoryService.updateCargo(username,cargo_load);
		res.send(results);
	}
	catch(error){
		console.log(error);
	}
}
//
async function getInventoryCargos(req,res){
	
	try{

		const results = await inventoryService.getInventoryCargos();
		res.send(results);
	}
	catch(error){
		console.log(error);
	}
}
//
async function loadCargo(req,res){
	
	try{
		const username = req.session.username;
		const results = await inventoryService.loadCargo(username);
		res.send(results);
	}
	catch(error){
		console.log(error);
	}
}
//
async function loadInventory(req,res){
	
	try{
		const results = await inventoryService.loadInventory();
		res.send(results);
	}
	catch(error){
		console.log(error);
	}
}
//
async function updateInventory(req,res){
	
	try{
		const username = req.session.username;
		const cargo_deload = req.body.deload_cargo;
		const results = await inventoryService.updateInventory(username,cargo_deload);
		res.send(results);
	}
	catch(error){
		console.log(error);
	}
}
//
async function getCurrentCategories(req,res){
	try{
	const results = await inventoryService.getCurrentCategories();	
	res.send(results);
	}
	catch(error){
		console.log(error);
	}
}
//
module.exports = {modifyInventory,updateCargo,getInventoryCargos,loadCargo,loadInventory,updateInventory,getCurrentCategories};