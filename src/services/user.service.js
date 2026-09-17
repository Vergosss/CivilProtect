const userRepository = require("./../repositories/user.repository");
const bcrypt = require("bcrypt");

async function Signup(data){
	try{

	let reg_username = data.username;
	let reg_password = data.password;   
	let reg_first_name = data.firstname;
	let reg_last_name = data.lastname;
	let reg_telephone = data.telephone;
	console.log('cords:',data.latitude,data.longitude);
	let reg_latitude = data.latitude;
	let reg_longitude = data.longitude;
	//hashing
	let hash = await bcrypt.hash(reg_password,10);
	//insert
	const result = await userRepository.insertCitizen(reg_username,hash,reg_first_name,reg_last_name,reg_telephone,reg_latitude,reg_longitude);
	if(result.affectedRows>0){
		//
		return {msg:'Successfully Registered!'};
		}
		else{
		//
		return {msg:'Username not available!'};
		}
	}
	catch(error){
		console.log(error);
	}

	
}
//
async function registerRescuer(data){
	try{

	let reg_username = data.username;
	let reg_password = data.password;   
	let reg_first_name = data.firstname;
	let reg_last_name = data.lastname;
	let reg_telephone = data.telephone;
	console.log('cords:',data.latitude,data.longitude);
	let reg_latitude = data.latitude;
	let reg_longitude = data.longitude;
	//hashing
	let hash = await bcrypt.hash(reg_password,10);
	//insert
	const result = await userRepository.insertRescuer(reg_username,hash,reg_first_name,reg_last_name,reg_telephone,reg_latitude,reg_longitude);
	if(result.affectedRows>0){
		//
		return {msg:'Successfully Inserted Rescuer!'};
		}
		else{
		//
		return {msg:'Rescuer already exists in Database!'};
		}
	}
	catch(error){
		console.log(error);
	}

	
}

//
async function Login(username,password){
	try{
		const results = await userRepository.getUser(username);
		if(results.length > 0){//an vrike ton xristi tote beno kano login
		let result = await bcrypt.compare(password,results[0].password);
		//
		if(result){
			return [{msg:"Success"},{role:results[0]['role']}]; //set session in controller
		}
		//
		else{
		console.log('Wrong username and or password');
		return [{msg:"Failure"}];
		}
		//
		}
		else{
		console.log('Wrong username and or password');
		return [{msg:"Failure"}];
		
		}

	}
	catch(error){
		console.log(error);
	}
}
//
module.exports= {Signup,registerRescuer,Login};