
console.log(__dirname);//pou vriskomai-Current working directory
const express = require("express");//import express module
const mysql = require("mysql2");//module for connecting to Database
const session = require('express-session');//module gia ta sessions
const bcrypt = require("bcrypt");//module for hashing passwords
const dotenv = require("dotenv");//module to load environment variables
//Environment variables
dotenv.config();
const USER = process.env.MARIADB_USER;
const PASSWORD = process.env.MARIADB_PASSWORD;
const DATABASE = process.env.MARIADB_DATABASE;
const HOST = process.env.MARIADB_HOSTNAME;
console.log(process.version);//NodeJS version
//
const multer = require("multer");//module for file uploading
const connection = mysql.createConnection({
	host     : HOST,
	user     : USER,
	password : PASSWORD,
	database : DATABASE
});
//session object to connect to the database

const app = express();//express object app
app.use('/public',express.static('public'));
//serve all files in the directory /public
//
//arxikopoio to session-!!an de to valo to session einai undefined kai peta errors sthn post
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
	//cookie: { maxAge: 60000 } // session timeout of 60 seconds-an perasei 1 lepto prepei na ksanakano login-katastrefei to session
}));
//
app.use((req,res,next)=>{
res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
next();
});
//
const bodyParser = require('body-parser'); // middleware- alios vivliothiki gia na prospelayno to body tou post request
//
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
//
app.use(express.json());//xoris ayto den kodikopoiountan ta dedomena kai gyrnage undefined cords sto backend
//
//route gia thn homepage
function LoggedIn(req,res,next){
	if(req.session.username){
		//an eisai loggedin synexise sto epomeno middleware
		return next(); // to return termatizei ton kodika ayths synarthshs-middlewarre-exyphreth
	}
	else{
		res.redirect('/');//if the user is not logged in trying to access any endpoint redirects to the login page
	}
}
//

//
app.get(['/','/login'],(req,res)=>{

//res.sendFile(__dirname + '\\public\\html\\login.html');
res.sendFile(__dirname + '/public/html/login.html');


});

 
//route gia to post ton dedomenon tis formas
app.post('/login',(req,res)=>{

let username = req.body.username;//perno ta dedomena pou esteila meso post apo to request mou
let password = req.body.password;

//kai ta typono meso tou response ths send

	connection.query('SELECT * FROM User WHERE username=?',[username],(error,results,fields)=>{
		if(error) throw error;
		if(results.length > 0)//an vrike ton xristi tote beno kano login
		{
		bcrypt.compare(password,results[0].password,(error,result)=>{
		if(error) throw error;
		if(result){
		req.session.logged_in = true; //afou o xristis yparxei sth vash tote syndethike mesa
		req.session.username = username;
		//
		console.log('Successfully logged in');
		//+
		
		req.session.role = results[0].role;
		//res.redirect('/home');//afou syndethikame epityxos anakateythine stin homepage
		//
		res.json({msg:"Success"});
		}
		else{// an apotyxei to compare
		console.log('Wrong username and or password');
		res.json({msg:"Failure"});
		}

		});
		
		//emfanise ti selida
		//
		}
		else{
		console.log('Wrong username and or password');
		res.json({msg:"Failure"});
		//res.send('Wrong username and/or password');
		}
		//
		
		});

});
//
/******Display the correct homepage depending on the logged-in user's role******* */
app.get('/home',(req,res)=>{
	//
	console.log(req.session);
	//
	//console.log('Role: ',role);
	if(req.session.username && req.session.role == 'Admin')
	{
	//res.sendFile(__dirname + '\\public\\html\\admin_homepage.html');
	res.sendFile(__dirname + '/public/html/admin_homepage.html');

	}
	else if(req.session.username && req.session.role == 'Rescuer')
	{
	
	//res.sendFile(__dirname + '\\public\\html\\rescuer_homepage.html');
	res.sendFile(__dirname + '/public/html/rescuer_homepage.html');

	}
	else if(req.session.username && req.session.role == 'Citizen')
	{
	//
	//res.sendFile(__dirname + '\\public\\html\\citizen_homepage.html');//
	res.sendFile(__dirname + '/public/html/citizen_homepage.html');//

	}

	else{
	res.redirect('/');
	}
	
});
//


//
/******Logout of the system***** */
app.get('/logout/',LoggedIn,(req,res)=>{

	console.log('Goodbye!');
	req.session.destroy(error=>{
	if(error) throw error;
	//role = null;//afou kaname logout den yparxei rolos
	res.redirect('/');
	});

//

});
//

//GET request at the /signup/ endpoint loads the signup page
app.get('/signup/',(req,res)=>{
	//res.sendFile(__dirname + '\\public\\html\\signup.html');  
	res.sendFile(__dirname + '/public/html/signup.html');  

	});

//
/*********Create a new citizen account******* */
app.post('/signup/',(req,res)=>{

	let reg_username = req.body.username;
	let reg_password = req.body.password;   
	let reg_first_name = req.body.firstname;
	let reg_last_name = req.body.lastname;
	let reg_telephone = req.body.telephone;
	console.log('cords:',req.body.latitude,req.body.longitude);
	let reg_latitude = req.body.latitude;
	let reg_longitude = req.body.longitude;
	//Hashing
	
	
	bcrypt.hash(reg_password,10,(error,hash)=>{
	if(error) throw error;
	//h hash periexei ton hasharismeno kodiko
	connection.query('INSERT IGNORE INTO User(username,password,first_name,last_name,telephone,cords,role) VALUES (?,?,?,?,?,POINT(?,?),"Citizen")',[reg_username,hash,reg_first_name,reg_last_name,reg_telephone,reg_latitude,reg_longitude],(error,result)=>{
	
		if(error) throw error;
		if(result.affectedRows>0){
		//
		res.json({msg:'Successfully Registered!'});
		}
		else{
		//
		res.json({msg:'Username not available!'});
		}
		
		});
	
	});
	//
	
	});
//
/*******Add a new rescuer to the database as an admin******* */
app.post('/register_rescuer/',LoggedIn,(req,res)=>{

	let reg_username = req.body.username;
	let reg_password = req.body.password;   
	let reg_first_name = req.body.firstname;
	let reg_last_name = req.body.lastname;
	let reg_telephone = req.body.telephone;
	console.log('cords:',req.body.latitude,req.body.longitude);
	console.log(reg_password);
	let reg_latitude = req.body.latitude;
	let reg_longitude = req.body.longitude;
	//
	bcrypt.hash(reg_password,10,(error,hash)=>{
		if(error) throw error;
		//h hash periexei ton hasharismeno kodiko
		connection.query('INSERT IGNORE INTO User(username,password,first_name,last_name,telephone,cords,role) VALUES (?,?,?,?,?,POINT(?,?),"Rescuer")',[reg_username,hash,reg_first_name,reg_last_name,reg_telephone,reg_latitude,reg_longitude],(error,result)=>{
		
			if(error) throw error;
			if(result.affectedRows>0){
			res.json({msg:'Successfully Inserted Rescuer!'});
			}
			else{
			res.json({msg:'Rescuer already exists in Database!'});
			}
			
			});
		
		});

});
/**************Get information about the availiable Items******* */
app.get('/get_items/',LoggedIn,(req,res)=>{

	connection.query('SELECT * FROM Item',(error,results)=>{

		if(error) throw error;
		res.send(results);
	})
});
//
/**********Submitting a request to be picked up by a rescuer* */
app.post('/request/',LoggedIn,(req,res)=>{
	let item = req.body.item;
	let quantity = req.body.quantity;
	let citizen_first_name,citizen_last_name,citizen_telephone;
	//
	connection.query('SELECT first_name,last_name,telephone,ST_X(cords),ST_Y(cords) FROM User Where username=? and role="Citizen"',[req.session.username],(error,results)=>{
		if(error) throw error;
		citizen_first_name = results[0].first_name;
		citizen_last_name = results[0].last_name;
		citizen_telephone = results[0].telephone;
		let latitude = results[0]['ST_X(cords)'];
		let longitude = results[0]['ST_Y(cords)'];
		//
//anagastika to deytero query sto proto epeidh logw async JS prepei na oloklirothei prota to proto query(na exo tis plirofories)
		connection.query('INSERT INTO Request(citizen_first_name,citizen_last_name,citizen_telephone,entry_date,item,quantity,cords,username,type) VALUES(?,?,?,NOW(),?,?,POINT(?,?),?,"Request")',[citizen_first_name,citizen_last_name,citizen_telephone,item,quantity,latitude,longitude,req.session.username],(error,results)=>{
			if(error) throw error;
			if(results.affectedRows>0){
				console.log('Request submitted successfully!');
				//
				res.json({msg:"Success !"});
			}
			else{
				console.log('Request failed');
				//
				res.json({msg:"Failure !"});
			}
		});
		
	});
	
});
//
/*********Get information about the availiable item Categories*** */
app.get('/get_categories/',LoggedIn,(req,res)=>{
	connection.query('SELECT * FROM Category',(error,results)=>{
		if(error) throw error;
		res.send(results);
	});
});
//
/************Add a new category******* */
app.post('/add_category/',LoggedIn,async (req,res)=>{
	let id = req.body.id;
	let category = req.body.category;
	let categories;
	try{
	let [results] = await connection.promise().query('INSERT IGNORE INTO Category(id,category_name) VALUES(?,?)',[id,category]);
	//
	[results] = await connection.promise().query('SELECT * FROM Category');
	categories = results;
	//
	res.send(categories);
	}
	catch(error){
		console.log('Error: ',error);
	}
});
//
/**********Add a new item***** */
app.post('/add_item/',LoggedIn,async (req,res)=>{

	let id = req.body.id;
	let item = req.body.item;
	let category = req.body.category;
	//
	let items;
	//
	try
	{

	let [results] = await connection.promise().query('INSERT IGNORE INTO Item(id,name,category) VALUES(?,?,?)',[id,item,category]);
	[results] = await connection.promise().query('SELECT * FROM Item');
	items = results;
	res.send(items);
	}
	catch(error){
		console.log('Error: ',error);
	}	
			
	
	
	});
	
//
app.get('/coordinates/', (req,res)=>{

	 connection.query('SELECT ST_X(cords),ST_Y(cords) FROM User WHERE role="Citizen"',(error,results,fields)=>{
		if(error) throw error;
		//
		res.send(results);
		});
});

//
/********Get citizen's coordinates****** */
app.get('/get_coordinates/',LoggedIn,(req,res)=>{

connection.query('SELECT ST_X(cords),ST_Y(cords) FROM User WHERE username=?',[req.session.username],(error,results)=>{
if(error) throw error;
res.send(results);

});

});
//
app.get('/citizens/',(req,res)=>{
	connection.query('SELECT username FROM User WHERE role="Citizen"',(error,results)=>{
	if(error) throw error;
	res.send(results);

	});

});
//
/************ */
var storage = multer.diskStorage({
	destination: function (req, file, callback) {
	  callback(null, './uploads/');
	},
	filename: function (req, file, callback) {
	  callback(null, file.fieldname + '-' + Date.now() + '.json');
	}
  });
  var upload = multer({ storage: storage });//to id tou file sto form
  const fs = require('fs');

//backend work for uploading-reading-inserting items/categories in DB
app.post('/upload_products/',upload.single('file'),(req,res)=>{//to orisma tou upload single prepei na einai IDIO me to key sto formdata antikeimeno
//AYTO ISXYEI OTAN KANO UPLOAD  EDO POU EINAI ASYCHRONA . AN KANO SYNCHRONO UPLOAD ME FORM ACTION TOTE PREPEI TO NAME TOU INPUT FILE NA EINAI 
//IDIO ME TO ORISMA TOU SINGLE
console.log(req.file);//alios peta error
const path = req.file.path;

//epistrefei ena object me plirofories sxetikes me to ypovlithen arxeio
//perno to path property pou einai to monopati pou vrisketai to arxeio
//diavazo to arxeio enonontas to trexon directory + '\\' + to path
fs.readFile(__dirname + '\\' + path,'utf-8',async (error,data)=>{
	if(error) throw error;
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
	try{
	//
	let [trunc] = await connection.promise().query('TRUNCATE TABLE item_details');
		//
		for(let category of categories){
			let [results] = await connection.promise().query('INSERT IGNORE INTO Category VALUES(?,?)',[category['id'],category['category_name']]);
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

			let [results] = await connection.promise().query('INSERT IGNORE INTO Item VALUES(?,?,?)',[product['id'],product['name'],product['category']]);
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
			let [results] = await connection.promise().query('INSERT INTO item_details VALUES(?,?,?)',[id,detail['detail_name'],detail['detail_value']]);
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
			let [results] = await connection.promise().query('SELECT * FROM Category');	
			new_categories = results;
			//
			[results] = await connection.promise().query('SELECT * FROM Item');
			new_items = results;
			//
			res.send([new_categories,new_items]);//send to the frontend the updated categories/Items
	//
	}
	catch(error){
		console.log('Error',error);
	}

});
});

//
/********Update availiable items/categories and details through direct call to the json's URL**** */
app.post('/update_products/',LoggedIn,async (req,res)=>{
	//
	let new_categories;
	let new_items;
	//
	let data = req.body;
	let {code,message,categories,...items} = data;
	//
	items = items.items;//einai object me ena mono key to items opote to prospelayno etsi
	//
	const products = items.map(item=>{return {id:item.id,name: item.name,category:item.category};});
	//
	try{
		let [trunc] = await connection.promise().query('TRUNCATE TABLE item_details');
		//
		for(let category of categories){
			let [results] = await connection.promise().query('INSERT IGNORE INTO Category VALUES(?,?)',[category['id'],category['category_name']]);
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

			let [results] = await connection.promise().query('INSERT IGNORE INTO Item VALUES(?,?,?)',[product['id'],product['name'],product['category']]);
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
			let [results] = await connection.promise().query('INSERT INTO item_details VALUES(?,?,?)',[id,detail['detail_name'],detail['detail_value']]);
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
			let [results] = await connection.promise().query('SELECT * FROM Category');	
			new_categories = results;
			//
			[results] = await connection.promise().query('SELECT * FROM Item');
			new_items = results;
			//
			res.send([new_categories,new_items]);//send to the frontend the updated categories/Items
	//
		}
		catch(error){
			console.log('Error: ',error);
		}


	//an evaza sth vash periorismous typou foreign keys tha eixa thema giati trexoun taytoxrona oi 3 parapano loopes
	//ta adeismata trexoun prota logw await alla ta ypoloipa para to for loop boroun na anamixthoun
});

//
/*******Get Base's coordinates*** */
app.get('/get_base/',LoggedIn,(req,res)=>{

connection.query('SELECT ST_X(cords),ST_Y(cords) FROM Base',(error,results)=>{

if(error) throw error;
res.send(results);

});
});
//
/*****Update Base's coordinates**** */
app.post('/change_base/',LoggedIn,(req,res)=>{

let latitude = req.body.latitude;
let longitude = req.body.longitude;
console.log(latitude,longitude);
connection.query('UPDATE Base SET cords = POINT(?,?)',[latitude,longitude],(error,results)=>{

if(error) throw error;
if(results.affectedRows>0){
console.log('Changed base cords succesfully!');
}
else{
console.log('Base cords didnt change');
}

});

});
//
/********Get the coordinates of the rescuer***** */
app.get('/get_vehicle/',LoggedIn,(req,res)=>{

connection.query('SELECT ST_X(cords),ST_Y(cords) FROM User WHERE role="Rescuer" AND username=?',[req.session.username],(error,results)=>{
if(error) throw error;
res.send(results);

});

});
//
/*******Get the coordinates of all rescuers**** */
app.get('/get_vehicles/',LoggedIn,async(req,res)=>{
//

let task_free_vehicles;
//
let task_busy_vehicles;
//
let [results] = await connection.promise().query('SELECT User.username,ST_X(cords),ST_Y(cords),item,quantity FROM User inner join Cargo on User.username = Cargo.username WHERE role="Rescuer" AND User.username IN(SELECT distinct vehicle_username from Request where vehicle_username is not null)');
//
task_busy_vehicles = results;
//
[results] = await connection.promise().query('SELECT User.username,ST_X(cords),ST_Y(cords),item,quantity FROM User inner join Cargo on User.username = Cargo.username WHERE role="Rescuer" AND User.username NOT IN(SELECT distinct vehicle_username from Request where vehicle_username is not null)');
task_free_vehicles = results;
//
res.send([task_free_vehicles,task_busy_vehicles]);

});
//
/*********Update coordinates of the rescuer***** */
app.post('/update_vehicle/',LoggedIn,(req,res)=>{
let latitude = req.body.latitude;
let longitude = req.body.longitude;
let username = req.session.username;
connection.query('UPDATE User SET cords=POINT(?,?) WHERE role="Rescuer" AND username=?',[latitude,longitude,username],(error,results)=>{

if(error) throw error;
if(results.affectedRows>0){
	console.log('Changed Vehicle position successfully!');
	res.json({msg:"OK !"});
}
else{
	console.log('Failed to change vehicle\'s position!');
	res.json({msg:"Error !"});
	
}
});

});
//
/****Fetch all the free requests/offers and the the requests/offers that the respective rescuer has undertaken********* */
app.get('/get_requests/',LoggedIn,(req,res)=>{

	connection.query('SELECT request_id,username,citizen_first_name,citizen_last_name,citizen_telephone,entry_date,item,quantity,ST_X(cords),ST_Y(cords),lifted,type FROM Request WHERE lifted=false OR vehicle_username=?',[req.session.username],(error,results)=>{
		if(error) throw error;
		res.send(results);
 	});
});
//
/*******As an admin get all the requests/offers including free ones and undertaken ones****** */
app.get('/fetch_requests/',LoggedIn,(req,res)=>{
//o admin vlepei ola ta requests opote to query ta gyrizei ola
	connection.query('SELECT username,citizen_first_name,citizen_last_name,citizen_telephone,entry_date,item,quantity,withdrawal_date,vehicle_username,ST_X(cords),ST_Y(cords),lifted,type FROM Request',(error,results)=>{
		if(error) throw error;
		res.send(results);
	});
});
//
//
/*****Get the citizen's request history****** */
app.get('/receive_requests/',LoggedIn,async (req,res)=>{
//
//
let untaken_requests;
let taken_requests;
let completed_requests;
try{

let [results] = await connection.promise().query('SELECT item,quantity FROM Request WHERE username=? AND type="Request" AND lifted=0',[req.session.username]);
//get free offers
untaken_requests = results;
//get offers that have been taken by a rescuer
[results] = await connection.promise().query('SELECT item,quantity,withdrawal_date FROM Request WHERE username=? AND lifted=1 AND type="Request"',[req.session.username]);
	//
taken_requests = results;
//get completed offers	kai to complete date
[results] = await connection.promise().query('SELECT item,quantity,entry_date,complete_date FROM Task WHERE username=? AND type="Request" AND completed=1',[req.session.username]);
completed_requests=results;
//
res.send([untaken_requests,taken_requests,completed_requests]);
}
catch(error){
	console.log('Error: ',error);
}

});
//
/************Load the inventory's items***** */
app.get('/load_inventory/',LoggedIn,(req,res)=>{
	connection.query('SELECT * FROM Inventory WHERE quantity>0',(error,results)=>{
		if(error) throw error;
		res.send(results);
	});
});
//
/********Unload all rescuer's cargo into Base's inventory****** */
app.post('/update_inventory/',LoggedIn,async (req,res)=>{

	let cargo_deload = req.body.deload_cargo;
	let new_inventory;
	let new_cargo;
	try{
	for(let item of cargo_deload){
	let [results] = await connection.promise().query('INSERT INTO Inventory(item,quantity,category) VALUES(?,?,?) ON DUPLICATE KEY UPDATE quantity= quantity + VALUES(quantity)',[item['item'],parseInt(item['quantity']),item['category']]);
	if(results.affectedRows>0){//INSERT ON DUPLICATE KAI EDO
	console.log('OK');
	}
	else{
	console.log('NOT OK');
	}
	//alios me promise all
	}
	//
	//kodikas gia enimerosi to fortio tou diasosti kai 
	for(let item of cargo_deload){
		let [results] = await connection.promise().query('UPDATE Cargo SET quantity = quantity - ? WHERE username=? AND item=?',[parseInt(item['quantity']),req.session.username,item['item']]);
		if(results.affectedRows>0){
			console.log('OK');
		}
		else{
			console.log('Problem!');
		}
		//
		}
	
	//
	let [results] = await connection.promise().query('SELECT * FROM Inventory WHERE quantity>0');
	new_inventory = results;
	//
	[results] = await connection.promise().query('SELECT item,quantity,category FROM Cargo WHERE username=? AND quantity>0',[req.session.username]);
	//na epistrepsei category
	new_cargo = results;
	console.log('New inventory:',new_inventory);
	console.log('New cargo:',new_cargo);
	res.send([new_inventory,new_cargo]);
}
	catch(error){
	console.log('Error: ',error);
	}
	
	});
//
/********Load rescuer's Cargo**** */
app.get('/load_cargo/',LoggedIn,(req,res)=>{
	connection.query('SELECT item,quantity,category FROM Cargo WHERE username=? AND quantity>0',[req.session.username],(error,results)=>{
		//na epistrepsei category
		if(error) throw error;
		res.send(results);
	});
});

/*******Load selected inventory items and their respective quantities into the rescuer's cargo**** */
app.post('/update_cargo/',LoggedIn,async (req,res)=>{
//enimerosi tou fortiou tou diasosti
//sto inventory key = username,item alios kanei ksana px iasonasmakris-water
	let cargo_load = req.body.add_cargo;
	let new_inventory;
	let new_cargo;
	console.log(cargo_load);
	try{
		//
		for(let product of cargo_load){
		let [results] = await connection.promise().query('INSERT INTO Cargo(username,item,quantity,category) VALUES(?,?,?,?) ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)',[req.session.username,product['item'],parseInt(product['quantity']),product['category']]);
		//
		if(results.affectedRows>0){
		console.log('OK');
		}
		else{
		console.log('NOT OK');
		}
		
		}
		//

		for(let product of cargo_load){
			let [results] = await connection.promise().query('UPDATE Inventory SET quantity=quantity - ? WHERE item=?',[parseInt(product['quantity']),product['item']]);
			if(results.affectedRows>0){
				console.log('Success');
			}
			else{
				console.log('Fail');
			}
		}
		//new inventory
		let [results] = await connection.promise().query('SELECT * FROM Inventory WHERE quantity>0');
		new_inventory = results;
		//new cargo
		[results] = await connection.promise().query('SELECT item,quantity,category FROM Cargo WHERE username=? AND quantity>0',[req.session.username]);
		//kai edo na gyrna category
		new_cargo = results;
		console.log('New inventory:',new_inventory);
		console.log('New cargo:',new_cargo);
		res.send([new_inventory,new_cargo]);
		}
		catch(error){
		console.log('Error: ',error);
		}

});
//
/**********Get all the inventory and cargo items*** */
app.get('/get_inventory_cargos/',LoggedIn,async (req,res)=>{
let inventory;
let cargos;
try{
let [results] = await connection.promise().query('SELECT * from Inventory WHERE quantity>0');
inventory = results;
//
[results] = await connection.promise().query('SELECT * FROM Cargo WHERE quantity>0');//mono ta proionta me mh mhdenikh posotita emfanizontai.an alaksoun oi posotites sthn epomenh tha fetsaristoun
cargos = results;
//
console.log('Inventory: ',inventory);
console.log('Cargos: ',cargos);
res.send([inventory,cargos]);
//
}
catch(error){
console.log('Error: ',error);
}
//
});
//
/****Get the categories of all the items that exist in the base's inventory or in a rescuer's cargo that have positive quantities* */
app.get('/get_current_categories/',LoggedIn,(req,res)=>{
//
connection.query('select category,category_name from Cargo inner join Category on Cargo.category=Category.id WHERE quantity>0 UNION select category,category_name from Inventory inner join Category on Inventory.category=Category.id WHERE quantity>0',(error,results)=>{
	//eksasfalizo me to union oti mono distinct katigories tha emfanistoun kai oti an sta cargos-apothiki yparxei item me mhdenikh posotita kai den yparxei
	//item ths idias katigorias me quantity>0 h kathgoria ayth na mhn epistrefetai oste na eksikonomiso xoro
	if(error) throw error;
	res.send(results);
});
//
});
//
/************Modify the quantity of an item in the inventory*********** */
app.post('/modify_inventory/',LoggedIn,async (req,res)=>{

	let adding_item = req.body.adding_item;
	let adding_quantity = req.body.adding_quantity;
	let adding_category = req.body.adding_category;
	//
	let inventory;
	let cargos;
	let current_categories;
	//
	try{
	//
	//edo isos to kano na yposthrizei enthesi,meiosi,ayksisi
	let [results] = await connection.promise().query('INSERT INTO Inventory(item,quantity,category) VALUES(?,?,?) ON DUPLICATE KEY UPDATE quantity=VALUES(quantity)',[adding_item,adding_quantity,adding_category]);
	if(results.affectedRows>0){
	console.log('Operation Successfull!');
	}
	else{
	console.log('Operation failed!');
	}
	//meta kodikas gia epistrofi inventory_cargos-yparxei
	[results] = await connection.promise().query('SELECT * from Inventory WHERE quantity>0');
	inventory = results;
	//
	[results] = await connection.promise().query('SELECT * FROM Cargo WHERE quantity>0');//mono ta proionta me mh mhdenikh posotita emfanizontai.an alaksoun oi posotites sthn epomenh tha fetsaristoun
	cargos = results;
	
	//kai kodikas gia current categories-yparxei
	[results] = await connection.promise().query('select category,category_name from Cargo inner join Category on Cargo.category=Category.id WHERE quantity>0 UNION select category,category_name from Inventory inner join Category on Inventory.category=Category.id WHERE quantity>0');
	current_categories = results;
	//
	res.send([inventory,cargos,current_categories]);
	}
	catch(error){
		 console.log('Error: ',error);
	}
	//
	});




//
/*******Create an active task****** */
app.post('/create_task/',LoggedIn,async (req,res)=>{
let username = req.body.username;
let task_id = req.body.request_id;
let first_name = req.body.first_name;
let last_name = req.body.last_name;
let telephone = req.body.telephone;
let item = req.body.item;
let quantity = req.body.quantity;
let type = req.body.type;

//
let new_requests;
let new_tasks;
//
try{
//
let [results] = await connection.promise().query('UPDATE Request SET lifted=true,vehicle_username=?,withdrawal_date=NOW() WHERE username=? AND request_id=?',[req.session.username,username,task_id]);

if(results.affectedRows>0){
console.log('Success!');
}
else{
console.log('Error!');
}

	//
 [results] = await connection.promise().query('INSERT INTO Task(task_id,username,citizen_first_name,citizen_last_name,citizen_telephone,entry_date,item,quantity,type,vehicle_username) VALUES (?,?,?,?,?,NOW(),?,?,?,?) ',[task_id,username,first_name,last_name,telephone,item,quantity,type,req.session.username]);
if(results.affectedRows>0){
	console.log('Success!');
}
else{
	console.log('Failure!');
}
//
[results] = await connection.promise().query('SELECT request_id,username,citizen_first_name,citizen_last_name,citizen_telephone,entry_date,item,quantity,ST_X(cords),ST_Y(cords),lifted,type FROM Request WHERE lifted=false OR vehicle_username=?',[req.session.username]);
new_requests = results;
//
[results] = await connection.promise().query('SELECT citizen_first_name,citizen_last_name,citizen_telephone,entry_date,item,quantity,task_id,username,type FROM Task WHERE completed=false AND vehicle_username=?',[req.session.username]);
new_tasks = results;


//
res.send([new_requests,new_tasks]);
//
}
catch(error){
	console.log('Error: ',error);
}

});
//boro na ta trexo taytoxrona





//gyrna piso ta ananeomena tasks


//
/************Complete the selected task and update the rescuer's cargo depending on the task type********** */
app.post('/complete_task/',LoggedIn,async (req,res)=>{
let tid = req.body.tid;
let item = req.body.item;
let quantity = req.body.quantity;
//logika kapoio type(request,offer)
let type = req.body.type;
//an type einai request meiose fortio diasosti alios an einai offer ayksise to
let category;
let new_tasks;
let new_requests;
let new_cargo;
	try{

		let [results] = await connection.promise().query('UPDATE Task SET completed = 1,complete_date=NOW() WHERE task_id=?',[tid]);
		if(results.affectedRows>0){
			console.log('Success!');
		}
		else{
			console.log('Failed!');
		}
		//
		[results]= await connection.promise().query('DELETE FROM Request WHERE request_id=?',[tid]);
		if(results.affectedRows>0){
			console.log('Deletion Succesfull');
		}
		else{
			console.log('Deletion failed');
		}
		//
		[results] = await connection.promise().query('SELECT citizen_first_name,citizen_last_name,citizen_telephone,entry_date,item,quantity,task_id,username,type FROM Task WHERE completed=false AND vehicle_username=?',[req.session.username]);
		new_tasks = results;
		//
		[results] = await connection.promise().query('SELECT request_id,username,citizen_first_name,citizen_last_name,citizen_telephone,entry_date,item,quantity,ST_X(cords),ST_Y(cords),lifted,type FROM Request WHERE lifted=false OR vehicle_username=?',[req.session.username]);
		new_requests = results;
		//
		if(type == 'Request'){
			[results] = await connection.promise().query('UPDATE Cargo SET quantity=quantity - ? WHERE username=? AND item=?',[quantity,req.session.username,item]);
		
			if(results.affectedRows>0){
				console.log('Update Succesfull');
			}
			else{
				console.log('Update failed');
			}
		
		}
		else if(type == 'Offer') {
			//
			[results] = await connection.promise().query('SELECT category from Item WHERE name=?',[item]);
			category = results[0].category;
			//
			[results] = await connection.promise().query('INSERT INTO Cargo(username,item,quantity,category) VALUES(?,?,?,?) ON DUPLICATE KEY UPDATE quantity=quantity + VALUES(quantity)',[req.session.username,item,quantity,category]);
			//idanika epeidh borei na mhn exei sto cargo tou to item epeidh milame gia prosfora kalytera 
			if(results.affectedRows>0){//tha valo kai to category EDO THA TO FETCHARO MIA TIMH EINAI MONO ME 1 MONO APOTELESMA
				console.log('Update Succesfull');
			}
			else{
				console.log('Update failed');
			}
		
		}
		//
		[results] = await connection.promise().query('SELECT item,quantity,category FROM Cargo WHERE username=? AND quantity>0',[req.session.username]);
		//kai edo na gyrna kategory
		new_cargo = results;
		//
		
		console.log('New tasks: ',new_tasks);
		console.log('New requests: ',new_requests);
		console.log('New cargo: ',new_cargo);
		res.send([new_tasks,new_requests,new_cargo]);
		//thelo kai kodika gia update cargo
	}
	catch(error){
		console.log('Error: ',error);
	}
	
//
//kodikas gia delete tou antistixou request
});

//

//
/********Load all the rescuer's currently active tasks ******* */
app.get('/get_tasks/',LoggedIn,(req,res)=>{
connection.query('SELECT citizen_first_name,citizen_last_name,citizen_telephone,entry_date,item,quantity,task_id,username,type FROM Task WHERE completed=false AND vehicle_username=?',[req.session.username],(error,results)=>{
if(error) throw error;
res.send(results);

});
});

//
/**********Cancelling a rescuer's task******* */
app.post('/cancel_task/',LoggedIn,async (req,res)=>{
	let tid = req.body.tid;
	let new_tasks;
	let new_requests;
//
try{
let [results] = await connection.promise().query('DELETE FROM Task WHERE task_id=?',[tid]);
if(results.affectedRows>0){
	console.log('Deleted successfully!');
}
else{
	console.log('Deletion Failed!');
}
//get the updated tasks
[results] = await connection.promise().query('SELECT citizen_first_name,citizen_last_name,citizen_telephone,entry_date,item,quantity,task_id,username,type FROM Task WHERE completed=false AND vehicle_username=?',[req.session.username]);
new_tasks = results;


//kane fetch kai ta requests meta gia ajax update tou map me thn show_requests2
[results] = await connection.promise().query('UPDATE Request SET lifted=0,vehicle_username=NULL,withdrawal_date=NULL where vehicle_username=? AND request_id=?',[req.session.username,tid]);
if(results.affectedRows>0){
	console.log('Updated successfully!');
}
else{
	console.log('Update Failed!');
}
//
[results] = await connection.promise().query('SELECT request_id,username,citizen_first_name,citizen_last_name,citizen_telephone,entry_date,item,quantity,ST_X(cords),ST_Y(cords),lifted,type FROM Request WHERE lifted=false OR vehicle_username=?',[req.session.username]);
new_requests = results;
//
console.log('New tasks : ',new_tasks);
console.log('New requests : ',new_requests);
//
res.send([new_tasks,new_requests]);


//
}
catch(error){
	console.log('Error: ',error);
}


//
});
//
app.get('/graph/',LoggedIn,(req,res)=>{
	connection.query('SELECT DATE(entry_date) as Date,count(request_id) as requests FROM Request group by DATE(entry_date)',(error,results)=>{
		res.send(results);
	});
});

//

//
/********Generate the statistics of Requests and offers in a given time period****** */
app.post('/get_dates/',LoggedIn,async (req,res)=>{
	let start = req.body.start;
	let end = req.body.end;
	let new_requests;
	let new_offers;
	let completed_requests;
	let completed_offers;
	try{
	//
	if(start && end){
		//queries me between
			let [results] = await connection.promise().query('SELECT DATE(entry_date) as Date,count(request_id) as requests FROM Request WHERE DATE(entry_date) BETWEEN ? AND ? AND type="Request" group by DATE(entry_date)',[start,end]);
			new_requests = results;
			
			//
			[results] = await connection.promise().query('SELECT DATE(entry_date) as Date,count(request_id) as offers FROM Request WHERE DATE(entry_date) BETWEEN ? AND ? AND type="Offer" group by DATE(entry_date)',[start,end]);
			new_offers=results;
			//
			[results] = await connection.promise().query('SELECT DATE(complete_date) as Date,count(task_id) as requests FROM Task WHERE DATE(complete_date) BETWEEN ? AND ? AND type="Request" AND completed=1 group by DATE(complete_date)',[start,end]);
			//
			completed_requests = results;
			//
			[results] = await connection.promise().query('SELECT DATE(complete_date) as Date,count(task_id) as offers FROM Task WHERE DATE(complete_date) BETWEEN ? AND ? AND type="Offer" AND completed=1 group by DATE(complete_date)',[start,end]);
			//
			completed_offers = results;
		}//kai oi dyo hmeromhnies einai ok
		
		else if(start && !end){
		//queries me date()>?
			let [results] = await connection.promise().query('SELECT DATE(entry_date) as Date,count(request_id) as requests FROM Request WHERE DATE(entry_date)>? AND type="Request" group by DATE(entry_date)',[start]);
			new_requests = results;
			
			//
			[results] = await connection.promise().query('SELECT DATE(entry_date) as Date,count(request_id) as offers FROM Request WHERE DATE(entry_date)>? AND type="Offer" group by DATE(entry_date)',[start]);
			new_offers=results;
			//
			[results] = await connection.promise().query('SELECT DATE(complete_date) as Date,count(task_id) as requests FROM Task WHERE DATE(complete_date)>? AND type="Request" AND completed=1 group by DATE(complete_date)',[start]);
			//
			completed_requests = results;
			//
			[results] = await connection.promise().query('SELECT DATE(complete_date) as Date,count(task_id) as offers FROM Task WHERE DATE(complete_date)>? AND type="Offer" AND completed=1 group by DATE(complete_date)',[start]);
			//
			completed_offers = results;
		}
		else if(!start && end){
		//queries me date()<?
		
			let [results] = await connection.promise().query('SELECT DATE(entry_date) as Date,count(request_id) as requests FROM Request WHERE DATE(entry_date)<? AND type="Request" group by DATE(entry_date)',[end]);
			new_requests = results;
			
			//
			[results] = await connection.promise().query('SELECT DATE(entry_date) as Date,count(request_id) as offers FROM Request WHERE DATE(entry_date)<? AND type="Offer" group by DATE(entry_date)',[end]);
			new_offers=results;
			//
			[results] = await connection.promise().query('SELECT DATE(complete_date) as Date,count(task_id) as requests FROM Task WHERE DATE(complete_date)<? AND type="Request" AND completed=1 group by DATE(complete_date)',[end]);
			//
			completed_requests = results;
			//
			[results] = await connection.promise().query('SELECT DATE(complete_date) as Date,count(task_id) as offers FROM Task WHERE DATE(complete_date)<? AND type="Offer" AND completed=1 group by DATE(complete_date)',[end]);
			//
			completed_offers = results;
		}
	//
	res.send([new_requests,new_offers,completed_requests,completed_offers]);
	}	
	catch(error){
		console.log('Error: ',error);
	}

	//
});

//
/*******Create Base's announcements to be displayed on the citizen's homepage******** */
app.post('/create_announcement/',LoggedIn,(req,res)=>{

	let text = req.body.text;
	let items = req.body.items;
	//date tora now()
	console.log(text,items);
	//query insert into announcement gia arxh
	connection.query('INSERT INTO Announcement(text,items,create_date) VALUES(?,?,NOW())',[text,items],(error,results)=>{
		if(error) throw error;
		if(results.affectedRows>0){
			res.json({msg:'Successfully created announcement!'});
		}
		else{
			res.json({msg:'Failed to create announcement!'});
		}
	});
});
//
/*******Load all the Base's announcements onto the citizen's homepage******* */
app.get('/get_announcements/',LoggedIn,(req,res)=>{

	connection.query('SELECT * FROM Announcement',(error,results)=>{
	
	if(error) throw error;
	res.send(results);
	
	});
	
	
	});
//
/***********Submit an Offer as a citizen*********** */
app.post('/offer/',LoggedIn,(req,res)=>{
	let item = req.body.item;
	let quantity = req.body.quantity;
	//
	console.log(item,quantity);

	let citizen_first_name,citizen_last_name,citizen_telephone;
	//kratane ta stixia gia na dimiourgithei to offer

	connection.query('SELECT first_name,last_name,telephone,ST_X(cords),ST_Y(cords) FROM User Where username=? and role="Citizen"',[req.session.username],(error,results)=>{
		if(error) throw error;
		citizen_first_name = results[0].first_name;
		citizen_last_name = results[0].last_name;
		citizen_telephone = results[0].telephone;
		let latitude = results[0]['ST_X(cords)'];
		let longitude = results[0]['ST_Y(cords)'];
		//
//anagastika to deytero query sto proto epeidh logw async JS prepei na oloklirothei prota to proto query(na exo tis plirofories)
//menei na valo to type=offer
		connection.query('INSERT INTO Request(citizen_first_name,citizen_last_name,citizen_telephone,entry_date,item,quantity,cords,username,type) VALUES(?,?,?,NOW(),?,?,POINT(?,?),?,"Offer")',[citizen_first_name,citizen_last_name,citizen_telephone,item,quantity,latitude,longitude,req.session.username],(error,results)=>{
			if(error) throw error;
			if(results.affectedRows>0){
				console.log('Offer submitted successfully!');
				//
				res.json({msg:"Success !"});
			}
			else{
				console.log('Offer failed');
				//
				res.json({msg:"Failure !"});
			}
		});
		
	});


});
//
app.post('/cancel_offer/',(req,res)=>{



});

//
/********Fetch all offers(new,pending,completed) of a citizen******** */
app.get('/receive_offers/',LoggedIn,async (req,res)=>{
	//
	let untaken_offers;
	let taken_offers;
	let completed_offers;
	try{
	
	let [results] = await connection.promise().query('SELECT item,quantity FROM Request WHERE username=? AND type="Offer" AND lifted=0',[req.session.username]);
	//get free offers
	untaken_offers = results;
	//get offers that have been taken by a rescuer
	[results] = await connection.promise().query('SELECT item,quantity,withdrawal_date FROM Request WHERE username=? AND lifted=1 AND type="Offer"',[req.session.username]);
		//
	taken_offers = results;
	//get completed offers	kai to complete date
	[results] = await connection.promise().query('SELECT item,quantity,entry_date,complete_date FROM Task WHERE username=? AND type="Offer" AND completed=1',[req.session.username]);
	completed_offers=results;
	//
	res.send([untaken_offers,taken_offers,completed_offers]);
	}
	catch(error){
		console.log('Error: ',error);
	}

});

//
module.exports = app;//an thelo na kano import se allo JS arxeio ton parapano kodika
/*****Listen for requests on the port 3000* */
app.listen(port,() => {
    console.log(`Listening on port ${port}!`);
  });