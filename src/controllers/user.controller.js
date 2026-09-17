const userService = require("./../services/user.service");
const path = require("path");

//
function logout(req,res){
	
	console.log('Goodbye!');
	req.session.destroy(error=>{
	if(error) throw error;
	//role = null;//afou kaname logout den yparxei rolos
	res.redirect('/');
	});

//

}
//
function signupPage(req,res){
	const fpath = path.resolve(__dirname,"../../public/html/signup.html");
	res.sendFile(fpath);
}
//
function loginPage(req,res){
	console.log(__dirname+'/../../public/html/login.html');
	//res.sendFile(__dirname+'/../../public/html/login.html');
	const fpath = path.resolve(__dirname,"../../public/html/login.html");
	res.sendFile(fpath);
}
//
function homePage(req,res){
	//
	console.log(req.session);
	//
	//console.log('Role: ',role);
	if(req.session.username && req.session.role == 'Admin')
	{
	//res.sendFile(__dirname + '\\public\\html\\admin_homepage.html');
	//res.sendFile(__dirname + '/../../public/html/admin_homepage.html');
	const fpath = path.resolve(__dirname,"../../public/html/admin_homepage.html");
	res.sendFile(fpath);

	}
	else if(req.session.username && req.session.role == 'Rescuer')
	{
	
	//res.sendFile(__dirname + '\\public\\html\\rescuer_homepage.html');
	//res.sendFile(__dirname + '/../../public/html/rescuer_homepage.html');
	const fpath = path.resolve(__dirname,"../../public/html/rescuer_homepage.html");
	res.sendFile(fpath);

	}
	else if(req.session.username && req.session.role == 'Citizen')
	{
	//
	//res.sendFile(__dirname + '\\public\\html\\citizen_homepage.html');//
	//res.sendFile(__dirname + '/../../public/html/citizen_homepage.html');//
	const fpath = path.resolve(__dirname,"../../public/html/citizen_homepage.html");
	res.sendFile(fpath);
	}

	else{
	res.redirect('/');
	}
}
//

async function Signup(req,res){
	try{
	const data = req.body;
	const msg = await userService.Signup(data);
	res.json(msg);
	}
	catch(error){
		console.log(error);
	}

	
}
//
async function registerRescuer(req,res){
	try{
	const data = req.body;
	const msg = await userService.registerRescuer(data);
	res.json(msg);
	}
	catch(error){
		console.log(error);
	}
}
//

async function Login(req,res){
	try{
		const username = req.body.username;
		const password = req.body.password;
		const msg = await userService.Login(username,password);
		if(msg[0]['msg'] === "Success"){
		req.session.logged_in = true; //afou o xristis yparxei sth vash tote syndethike mesa
		req.session.username = username;
		//
		console.log('Successfully logged in');
		//+
		
		req.session.role = msg[1]['role'];
		}
		res.json(msg[0]);
	}
	catch(error){
		console.log(error);
	}
}
//
module.exports = {logout,signupPage,loginPage,homePage,Signup,registerRescuer,Login};