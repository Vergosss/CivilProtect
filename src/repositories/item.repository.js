const connection = require("./../config/db");
//
async function getItems(){
	try{
	const [results] = await connection.promise().query('SELECT * FROM Item');
	return results;
	}
	catch(error){
		console.log(error);
	}
}
//
async function getCategories(){
	try{
	const [results] = await connection.promise().query('SELECT * FROM Category');
	return results;
	}
	catch(error){
		console.log(error);
	}
}
//
async function addItem(id,item,category){
	try{
	const [results] = await connection.promise().query('INSERT IGNORE INTO Item(id,name,category) VALUES(?,?,?)',[id,item,category]);
	return results;
	}
	catch(error){
		console.log(error);
	}
}
//
async function addCategory(id,category){
	
	try{
	const [results] = await connection.promise().query('INSERT IGNORE INTO Category(id,category_name) VALUES(?,?)',[id,category]);
	return results;
	}
	catch(error){
		console.log(error);
	}
}
//
async function emptyDetails(){
	
	try{
		const [results] = await connection.promise().query('TRUNCATE TABLE item_details');
		return results;
	}
	catch(error){
		console.log(error);
	}
}
//
async function addDetail(id,name,value){
	
	try{
		const [results] = await connection.promise().query('INSERT INTO item_details VALUES(?,?,?)',[id,name,value]);
		return results;
	}
	catch(error){
		console.log(error);
	}
	
}
//
module.exports = {getItems,getCategories,addItem,addCategory,emptyDetails,addDetail};