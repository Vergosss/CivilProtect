

const express = require("express");//import express module
const mysql = require("mysql2");
const session = require('express-session');//module gia ta sessions
const bcrypt = require("bcrypt");
//
//const path = require('path');
console.log(process.version);
const multer = require("multer");
const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'web'
});
//

const app = express();//express object app
app.use('/public',express.static('/home/vergman/Desktop/Web Programming 2024/Web-Programming-and-Systems/public'));
//console.log(__dirname + '/../public/');
//arxikopoio to session-!!an de to valo to session einai undefined kai peta errors sthn post
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
	//cookie: { maxAge: 60000 } // session timeout of 60 seconds
}));
//
app.use((req,res,next)=>{
res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
next();
});
//
const bodyParser = require('body-parser'); // middleware
//
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
//
app.use(express.json());//xoris ayto den kodikopoiountan ta dedomena kai gyrnage undefined cords sto backend
//
//route gia thn homepage
app.get(['/','/login'],(req,res)=>{

res.sendFile(__dirname + '/public/login.html');

});

var role = null;
//route gia to post ton dedomenon tis formas
app.post('/login',(req,res)=>{

let username = req.body.username;//perno ta dedomena pou esteila meso post apo to request mou
let password = req.body.password;
//res.send(`Username: ${username} Password: ${password}`);
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
		//req.session.user = 1;
		console.log('Successfully logged in');
		//+
		
		role = results[0].role;
		res.redirect('/home');//afou syndethikame epityxos anakateythine stin homepage
		}
		else{// an apotyxei to compare
		console.log('Wrong username and or password');
		}

		});
		//res.send('Succesfull login');
		
		//emfanise ti selida
		//res.redirect('/'); // to url tis selidas pou tha kanoume redirect
		}
		else{
		res.send('Wrong username and/or password');
		}
		//res.end(); an exo th grammh epeidh stelno dyo fores tin apantisi petaei to http header sent
		
		});

});
//

app.get('/home',(req,res)=>{
	//res.send('Welcome');
	console.log(req.session);
	//console.log(req.session.user);
	console.log('Role: ',role);
	if(req.session.username && role == 'Admin')
	{
	res.sendFile(__dirname + '/public/admin_homepage.html');
	}
	else if(req.session.username && role == 'Rescuer')
	{
	
	res.sendFile(__dirname + '/public/rescuer_homepage.html');
	}
	else if(req.session.username && role == 'Citizen')
	{
	console.log('Role:',role);
	res.sendFile(__dirname + '/public/citizen_homepage.html');//
	}

	else{
	res.redirect('/');
	}
	
});
//


//
app.get('/logout',(req,res)=>{
if(req.session.username){
	console.log('Goodbye!');
	req.session.destroy(error=>{
	if(error) throw error;
	res.redirect('/');
	});
}
else{
	console.log('Not logged in!');
	res.end();
}

});
//

//
app.get('/signup',(req,res)=>{
	res.sendFile(__dirname + '/public/signup.html');  
	});

//
app.post('/signup',(req,res)=>{

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
	connection.query('INSERT INTO User(username,password,first_name,last_name,telephone,cords,role) VALUES (?,?,?,?,?,POINT(?,?),"Citizen")',[reg_username,hash,reg_first_name,reg_last_name,reg_telephone,reg_latitude,reg_longitude],(error,result)=>{
	
		if(error) throw error;
		if(result.affectedRows>0){
		res.send('Successfully registered!');
		}
		else{
		res.send('User already in database');
		}
		
		});
	
	});
	//Hashing
	
	
	});
//
app.post('/register_rescuer/',(req,res)=>{

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
		connection.query('INSERT INTO User(username,password,first_name,last_name,telephone,cords,role) VALUES (?,?,?,?,?,POINT(?,?),"Rescuer")',[reg_username,hash,reg_first_name,reg_last_name,reg_telephone,reg_latitude,reg_longitude],(error,result)=>{
		
			if(error) throw error;
			if(result.affectedRows>0){
			res.send('Successfully registered!');
			}
			else{
			res.send('User already in database');
			}
			
			});
		
		});

});


//
const fs = require('fs');
//
app.get('/test/', (req,res)=>{
fs.readFile(__dirname + '/uploads/upload-1721913498358.json','utf-8',(error,data)=>{
//asygxrona diavase to arxeio(exei callback)
	if(error) throw error;
	data = JSON.parse(data);//diavase ta dedomena os json
	let {code,message,categories,...items} = data;//afairo apo to arxeio to code,message,categories gia na xeiristo mono ta proionta
	//kai menoun mono ta items
	//let {details,...rest} = items;
	//console.log(items);
	//console.log(data);
	//console.log(rest);
	const final_items = items.items.map(({details,...rest})=>rest);//epestrepse to rest
	//afairo to details kathe eggrafhs-json object-stixiou tou array meso ths map
	//to items  epistrefei {items:[...]} to items.items episrefei [...]
	//console.log(final_items);
connection.query('TRUNCATE TABLE Item',(error,results)=>{
	if(error) throw error;
});
	for(let item of final_items){
		connection.query('INSERT INTO Item VALUES(?,?,?)',[item.id,item.name,item.category],(error,results)=>{
			if(error) throw error;
			if(results.affectedRows>0){
				console.log('Success!');
			}//diatrexo to array twn objects 
			else{
				console.log('Failed');
			}
		});
		
	}

 
//Katharizo to table prota gia na mhn ksanaeisaxthoun ta proionta
connection.query('TRUNCATE TABLE Category',(error,results)=>{
	if(error) throw error;

});
console.log(categories);
	for(let category of categories){
		connection.query('INSERT INTO Category VALUES(?,?)',[category.id,category['category_name']],(error,results)=>{
			if(error) throw error;
			if(results.affectedRows>0){
				console.log('Success!');
			}
			else{
				console.log('Error!');
			}
		});
	}
});

});
//
app.get('/get_items/',(req,res)=>{

	connection.query('SELECT name FROM Item',(error,results)=>{

		if(error) throw error;
		res.send(results);
	})
});
//
app.post('/request/',(req,res)=>{
	let item = req.body.item;
	var citizen_first_name,citizen_last_name,citizen_telephone;
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
		connection.query('INSERT INTO Request(citizen_first_name,citizen_last_name,citizen_telephone,entry_date,item,quantity,cords,username) VALUES(?,?,?,NOW(),?,1,POINT(?,?),?)',[citizen_first_name,citizen_last_name,citizen_telephone,item,latitude,longitude,req.session.username],(error,results)=>{
			if(error) throw error;
			if(results.affectedRows>0){
				console.log('Request submitted successfully!');
				//res.end();
				res.json({Success:"!"});
			}
			else{
				console.log('Request failed');
				//res.end();
				res.json({Failure:"!"});
			}
		});
		
	});
	
});
//
app.get('/get_categories/',(req,res)=>{
	connection.query('SELECT category_name FROM Category',(error,results)=>{
		if(error) throw error;
		res.send(results);
	});
});
//
app.get('/coordinates/', (req,res)=>{

	 connection.query('SELECT ST_X(cords),ST_Y(cords) FROM User WHERE role="Citizen"',(error,results,fields)=>{
		if(error) throw error;
		//console.log(results[0]['ST_X(cords)']);
		//res.json(results);
		res.send(results);
		});
});

//
app.get('/get_coordinates/',(req,res)=>{

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
var storage = multer.diskStorage({
	destination: function (req, file, callback) {
	  callback(null, './uploads/');
	},
	filename: function (req, file, callback) {
	  callback(null, file.fieldname + '-' + Date.now() + '.json');
	}
  });
  var upload = multer({ storage: storage });//to id tou file sto form
//
app.post('/upload_products/',upload.single('upload'),(req,res)=>{
//console.log(req);
	
res.send(req.file);

//console.log(req.file);
});
//
app.get('/get_base/',(req,res)=>{

connection.query('SELECT ST_X(cords),ST_Y(cords) FROM Base',(error,results)=>{

if(error) throw error;
res.send(results);

});
});
//
app.post('/change_base/',(req,res)=>{

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
app.get('/get_vehicle/',(req,res)=>{

connection.query('SELECT ST_X(cords),ST_Y(cords) FROM User WHERE role="Rescuer" AND username=?',[req.session.username],(error,results)=>{
if(error) throw error;
res.send(results);

});

});
//
app.get('/get_vehicles/',(req,res)=>{

connection.query('SELECT username,ST_X(cords),ST_Y(cords) FROM User WHERE role="Rescuer"',(error,results)=>{
if(error) throw error;
res.send(results);

});

});
//
app.post('/update_vehicle/',(req,res)=>{
let latitude = req.body.latitude;
let longitude = req.body.longitude;
let username = req.session.username;
connection.query('UPDATE User SET cords=POINT(?,?) WHERE role="Rescuer" AND username=?',[latitude,longitude,username],(error,results)=>{

if(error) throw error;
if(results.affectedRows>0){
	console.log('Changed Vehicle position successfully!');
}
else{
	console.log('Failed to change vehicle\'s position!');
	
}
});

});
//
app.get('/get_requests/',(req,res)=>{

	connection.query('SELECT username,citizen_first_name,citizen_last_name,citizen_telephone,entry_date,item,quantity,ST_X(cords),ST_Y(cords),lifted FROM Request WHERE lifted=false OR vehicle_username=?',[req.session.username],(error,results)=>{
		if(error) throw error;
		res.send(results);
 	});
});
//
app.get('/fetch_requests/',(req,res)=>{

	connection.query('SELECT citizen_first_name,citizen_last_name,citizen_telephone,entry_date,item,quantity,withdrawal_date,vehicle_username,ST_X(cords),ST_Y(cords),lifted FROM Request',(error,results)=>{
		if(error) throw error;
		res.send(results);
	});
});
//
//
app.get('/receive_requests/',(req,res)=>{
	connection.query('SELECT entry_date,item,quantity FROM Request WHERE citizen_first_name="giorgos"',(error,results)=>{

		if(error) throw error;
		res.send(results);
	});
});
//
app.post('/create_task/',(req,res)=>{
let username = req.body.username;
connection.query('UPDATE Request SET lifted=true,vehicle_username=?,withdrawal_date=NOW() WHERE username=?',[req.session.username,username],(error,results)=>{
if(error) throw error;
if(results.affectedRows>0){
	console.log('Success!');
}
else{
	console.log('Error!');
}

});
//boro na ta trexo taytoxrona
/*
connection.query('INSERT INTO Task(username,citizen_first_name,citizen_last_name,citizen_telephone,entry_date,item,quantity) VALUES (?,?,?,?,NOW(),?,1) ',[],(error,results)=>{
	if(error) throw error;
	if(results.affectedRows>0){
		console.log('Success!');
	}
	else{
		console.log('Error!');
	}


});
*/
});
//
/*
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
  });//gia na lyso to provlima tou CORS
*/
  //

//
module.exports = app;//an thelo na kano import se allo JS arxeio ton parapano kodika
app.listen(port,() => {
    console.log(`Example app listening on port ${port}!`);
  });