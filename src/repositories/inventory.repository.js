const connection = require("./../config/db");

//
async function getCargo(username){
	
	try{
		const [results] = await connection.promise().query('SELECT item,quantity,category FROM Cargo WHERE username=? AND quantity>0',[username]);
		return results;
	}
	catch(error){
		console.log(error);
	}
	
}
//
async function getInventory(){
	try{
		const [results] = await connection.promise().query('SELECT * FROM Inventory WHERE quantity>0');
		return results;
	}
	catch(error){
		console.log(error);
	}
}
//
async function getCargos(){
	try{
		const [results] = await connection.promise().query('SELECT * FROM Cargo WHERE quantity>0');
		return results;
	}
	catch(error){
		console.log(error);
	}
}
//
async function getCurrentCategories(){
	try{
	const [results] = await connection.promise().query('select category,category_name from Cargo inner join Category on Cargo.category=Category.id WHERE quantity>0 UNION select category,category_name from Inventory inner join Category on Inventory.category=Category.id WHERE quantity>0');
	return results;
	}
	catch(error){
		console.log(error);
	}
}
//
async function addCargo(username,item,quantity,category){
	
	try{
		const [results] = await connection.promise().query('INSERT INTO Cargo(username,item,quantity,category) VALUES(?,?,?,?) ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)',[username,item,quantity,category]);
		return results;
	}
	catch(error){
		console.log(error);
	}
	

}
//
async function addInventory(item,quantity,category){
	try{
		const [results] = await connection.promise().query('INSERT INTO Inventory(item,quantity,category) VALUES(?,?,?) ON DUPLICATE KEY UPDATE quantity= quantity + VALUES(quantity)',[item['item'],parseInt(item['quantity']),item['category']]);
		return results;
	}
	catch(error){
		console.log(error);
	}
	
}
//
async function updateCargo(quantity,username,item){
	try{
	const [results] = await connection.promise().query('UPDATE Cargo SET quantity = quantity - ? WHERE username=? AND item=?',[quantity,username,item]);
	return results;
	}
	catch(error){
		console.log(error);
	}
}
//
async function updateInventory(quantity,item){
	try{
		const [results] = await connection.promise().query('UPDATE Inventory SET quantity=quantity - ? WHERE item=?',[quantity,item]);
		return results;
	}
	catch(error){
		console.log(error);
	}
}
//
async function modifyInventory(adding_item,adding_quantity,adding_category){
	
	try{
		const [results] = await connection.promise().query('INSERT INTO Inventory(item,quantity,category) VALUES(?,?,?) ON DUPLICATE KEY UPDATE quantity=VALUES(quantity)',[adding_item,adding_quantity,adding_category]);
		return results;
	}
	catch(error){
		console.log(error);
	}
	
}
//
async function updateCargoOnOffer(vehicle_username,item,quantity,category){
	try{
		const [results] = await connection.promise().query('INSERT INTO Cargo(username,item,quantity,category) VALUES(?,?,?,?) ON DUPLICATE KEY UPDATE quantity=quantity + VALUES(quantity)',[vehicle_username,item,quantity,category]);
		return results;
	}
	catch(error){
		console.log(error);
	}
}
//
module.exports = {getCargo,getInventory,getCargos,getCurrentCategories,addCargo,addInventory,updateCargo,updateInventory,modifyInventory,updateCargoOnOffer};