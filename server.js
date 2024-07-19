
const express = require("express");//import express module
const mysql = require("mysql");
const session = require('express-session');//module gia ta sessions
const bcrypt = require("bcrypt");
//
//const path = require('path');

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
app.get('/',(req,res)=>{

res.sendFile(__dirname + '/public/login.html');

});


//route gia to post ton dedomenon tis formas
app.post('/login',(req,res)=>{

let username = req.body.username;//perno ta dedomena pou esteila meso post apo to request mou
let password = req.body.password;
//res.send(`Username: ${username} Password: ${password}`);
//kai ta typono meso tou response ths send

	connection.query('SELECT * FROM Citizen WHERE username=?',[username],(error,results,fields)=>{
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
	if(req.session.username){
	res.sendFile(__dirname + '/public/homepage.html');
	}
	else{
	res.redirect('/');
	}
	
});

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
}

});
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
	connection.query('INSERT INTO Citizen(username,password,first_name,last_name,telephone,cords) VALUES (?,?,?,?,?,POINT(?,?))',[reg_username,hash,reg_first_name,reg_last_name,reg_telephone,reg_latitude,reg_longitude],(error,result)=>{
	
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
app.get('/coordinates/', (req,res)=>{

	 connection.query('SELECT ST_X(cords),ST_Y(cords) FROM Citizen',(error,results,fields)=>{
		if(error) throw error;
		//console.log(results[0]['ST_X(cords)']);
		//res.json(results);
		res.send(results);
		});
});

app.get('/citizens/',(req,res)=>{
	connection.query('SELECT username FROM Citizen',(error,results)=>{
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


module.exports = app;
app.listen(port,() => {
    console.log(`Example app listening on port ${port}!`);
  });