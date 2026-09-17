const itemRepository = require("./../repositories/item.repository");
const fs = require("fs/promises");
//
async function getItems(){
	try{
	const items = await itemRepository.getItems();
	return items;
	}
	catch(error){
		console.log(error);
	}
}
//
async function getCategories(){
	try{
	const categories = await itemRepository.getCategories();
	return categories;
	}
	catch(error){
		console.log(error);
	}
}
//
async function addItem(id,item,category){
	try{
	//
	let items;
	let results = await itemRepository.addItem(id,item,category);
	results = await itemRepository.getItems();
	items = results;
	//
	return items;
	}
	catch(error){
		console.log(error);
	}
}
//
async function addCategory(id,category){
	try{

	//
	let results = await itemRepository.addCategory(id,category);
	//
	results = await itemRepository.getCategories();
	categories = results;
	//
	return categories;
	}
	catch(error){
		console.log(error);
	}
}
//
async function updateProducts(data){//exactly same for upload
	try{
	let new_categories;
	let new_items;
	//
	let {code,message,categories,...items} = data;
	//
	items = items.items;//einai object me ena mono key to items opote to prospelayno etsi
	//
	const products = items.map(item=>{return {id:item.id,name: item.name,category:item.category};});
	//
	
		let trunc = await itemRepository.emptyDetails();
		//
		for(let category of categories){
			let results = await itemRepository.addCategory(category['id'],category['category_name']);
			if(results.affectedRows>0){
			console.log('Category inserted!');
			}
			else{
			console.log('Error or most propably Category already exists!');
			}
			//
			}




		//
		for(let product of products){

			let results = await itemRepository.addItem(product['id'],product['name'],product['category']);
			if(results.affectedRows>0){
			console.log('Item inserted!');
			}
			else{
			console.log('Error or most propably item already exists!');
			}
			//
			}
			
			//
			for(let item of items){
			
			let id = item.id;
			for(let detail of item.details){
			//
			let results = await itemRepository.addDetail(id,detail['detail_name'],detail['detail_value']);
			if(results.affectedRows>0){
			console.log('Successfull');
			}
			else{
			console.log('Unsuccessfull');
			}
			//
			}
			
			//
			}
			//
			
			//res.json({msg:"Done Fetching"});
			let results = await itemRepository.getCategories();
			new_categories = results;
			//
			results = await itemRepository.getItems();
			new_items = results;
			//
			return [new_categories,new_items];//send to the frontend the updated categories/Items
	}
	catch(error){
		console.log(error);
	}
}
//

async function uploadProducts(path){
	
	try{
		
		let data = await fs.readFile(__dirname + '/' + path,'utf-8');
		//
		let new_items;
		let new_categories;
		data = JSON.parse(data);//diavase ta dedomena os JSON
		//
		let {code,message,categories,...items} = data;//afairo apo to arxeio to code,message,categories gia na xeiristo mono ta proionta
		items = items.items;//afairo to {} sta akra-ara einai array objects tora
		const arr = items.map(item=>item.details);
		//
		const products = items.map(item=>{return {id:item.id,name: item.name,category:item.category};});
		console.log(products);
		//
		//
		let trunc = await itemRepository.emptyDetails();
		//
		for(let category of categories){
			let results = await itemRepository.addCategory(category['id'],category['category_name']);
			if(results.affectedRows>0){
			console.log('Category inserted!');
			}
			else{
			console.log('Error or most propably Category already exists!');
			}
			//
			}

		//
		for(let product of products){

			let results = await itemRepository.addItem(product['id'],product['name'],product['category']);
			if(results.affectedRows>0){
			console.log('Item inserted!');
			}
			else{
			console.log('Error or most propably item already exists!');
			}
			//
			}
			
			//
			for(let item of items){
			
			let id = item.id;
			for(let detail of item.details){
			//
			let results = await itemRepository.addDetail(id,detail['detail_name'],detail['detail_value']);
			if(results.affectedRows>0){
			console.log('Successfull');
			}
			else{
			console.log('Unsuccessfull');
			}
			//
			}
			
			//
			}
			//
			
			//res.json({msg:"Done Uploading!"});
			//
			let results = await itemRepository.getCategories();	
			new_categories = results;
			//
			results = await itemRepository.getItems();
			new_items = results;
			//
			return [new_categories,new_items];//send to the frontend the updated categories/Items
		
		
		
		//
	}
	catch(error){
		console.log(error);
	}
}
//
module.exports = {getItems,getCategories,addItem,addCategory,updateProducts,uploadProducts};
//
