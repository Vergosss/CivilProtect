const itemService = require("./../services/item.service");
//
async function getItems(req,res){
	try{
	const results = await itemService.getItems();
	res.send(results);
	}
	catch(error){
		console.log(error);
	}
}
//
async function getCategories(req,res){
	try{
	const results = await itemService.getCategories();
	res.send(results);
	}
	catch(error){
		console.log(error);
	}
}
//
async function addItem(req,res){
	try{
	const id = req.body.id;
	const item = req.body.item;
	const category = req.body.category;
	//
	
	const items = await itemService.addItem(id,item,category);
	res.send(items);
	}
	catch(error){
		console.log(error);
	}
}
//
async function addCategory(req,res){
	try{
	const id = req.body.id;
	const category = req.body.category;
	//
	
	const categories = await itemService.addCategory(id,category);
	res.send(categories);
	}
	catch(error){
		console.log(error);
	}
}
//
async function updateProducts(req,res){
	try{
	
	const data = req.body;
	const updated = await itemService.updateProducts(data);
	res.send(updated);

	}
	catch(error){
		console.log(error);
	}
}
//
async function uploadProducts(req,res){
	try{
	
	console.log(req.file);//alios peta error
	const path = req.file.path;
	const results = await itemService.uploadProducts(path);
	res.send(results);

	}
	catch(error){
		console.log(error);
	}
}

//
module.exports = {getItems,getCategories,addItem,addCategory,updateProducts,uploadProducts};