const inventoryRepository = require("./../repositories/inventory.repository");
//
async function modifyInventory(data){
	
	try{
		const adding_item = data.adding_item;
		const adding_quantity = data.adding_quantity;
		const adding_category = data.adding_category;
		let inventory;
		let cargos;
		let current_categories;
	//
		
	let results = await inventoryRepository.modifyInventory(adding_item,adding_quantity,adding_category);
	//
	if(results.affectedRows>0){
	console.log('Operation Successfull!');
	}
	else{
	console.log('Operation failed!');
	}
	//
	//meta kodikas gia epistrofi inventory_cargos-yparxei
	results = await inventoryRepository.getInventory();
	inventory = results;
	//
	//
	results = await inventoryRepository.getCargos();//mono ta proionta me mh mhdenikh posotita emfanizontai.an alaksoun oi posotites sthn epomenh tha fetsaristoun
	cargos = results;
	
	//kai kodikas gia current categories-yparxei
	results = await inventoryRepository.getCurrentCategories();
	current_categories = results;
	//
	return [inventory,cargos,current_categories];

	}
	catch(error){
		console.log(error);
	}
}
//
async function updateCargo(username,cargo_load){
	
	try{
	let new_inventory;
	let new_cargo;
	console.log(cargo_load);
	//
	for(let product of cargo_load){
		let results = await inventoryRepository.addCargo(username,product['item'],parseInt(product['quantity']),product['category']);
		//
		if(results.affectedRows>0){
		console.log('OK');
		}
		else{
		console.log('NOT OK');
		}
		
	}

	//
			//

		for(let product of cargo_load){
			let results = await inventoryRepository.updateInventory(parseInt(product['quantity']),product['item']);
			if(results.affectedRows>0){
				console.log('Success');
			}
			else{
				console.log('Fail');
			}
		}
	//
		let results = await inventoryRepository.getInventory();
		new_inventory = results;
		//new cargo
		results = await inventoryRepository.getCargo(username);
		//kai edo na gyrna category
		new_cargo = results;
		console.log('New inventory:',new_inventory);
		console.log('New cargo:',new_cargo);
		return [new_inventory,new_cargo];
	//
	}
	catch(error){
		console.log(error);
	}
}
//
async function getInventoryCargos(){
	
	try{
		let inventory;
		let cargos;
		let results = await inventoryRepository.getInventory();//
		inventory = results;
			//
		results = await inventoryRepository.getCargos();//
		cargos = results;
		//
		console.log('Inventory: ',inventory);
		console.log('Cargos: ',cargos);
		return [inventory,cargos]; 
	}
	catch(error){
		console.log(error);
	}
}
//
async function loadCargo(username){
	
	try{
	const cargo = await inventoryRepository.getCargo(username);
	return cargo;
	}
	catch(error){
		console.log(error);
	}
}
//
async function loadInventory(){
	
	try{
		const inventory = await inventoryRepository.getInventory();
		return inventory;
	}
	catch(error){
		console.log(error);
	}
}
//
async function updateInventory(username,cargo_deload){
	
	try{
	let new_inventory;
	let new_cargo;
	//
	for(let item of cargo_deload){
	let results = await inventoryRepository.addInventory(item['item'],parseInt(item['quantity']),item['category']);
	if(results.affectedRows>0){//INSERT ON DUPLICATE KAI EDO
	console.log('OK');
	}
	else{
	console.log('NOT OK');
	}
	//alios me promise all
	}
	//
	for(let item of cargo_deload){
	let results = await inventoryRepository.updateCargo(parseInt(item['quantity']),username,item['item']);
	if(results.affectedRows>0){
		console.log('OK');
	}
	else{
		console.log('Problem!');
	}
	//
	}
	//
	let results = await inventoryRepository.getInventory();
	new_inventory = results;
	//
	results = await inventoryRepository.getCargo(username);
	//na epistrepsei category
	new_cargo = results;
	//
	console.log('New inventory:',new_inventory);
	console.log('New cargo:',new_cargo);
	
	
	return [new_inventory,new_cargo];
	
	
	//
	}
	catch(error){
		console.log(error);
	}
}
//
async function getCurrentCategories(){
	try{
	const currentcategories = await inventoryRepository.getCurrentCategories();	
	return currentcategories;
	
	}
	catch(error){
		console.log(error);
	}
}
//
module.exports = {modifyInventory,updateCargo,getInventoryCargos,loadCargo,loadInventory,updateInventory,getCurrentCategories};