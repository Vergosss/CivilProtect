const taskRepository = require("./../repositories/task.repository");
const inventoryRepository = require("./../repositories/inventory.repository");
const requestRepository = require("./../repositories/request.repository");
const itemRepository = require("./../repositories/item.repository");
//
async function createTask(vehicle_username,data){
	
	try{


	let username = data.username;
	let task_id = data.request_id;
	let first_name = data.first_name;
	let last_name = data.last_name;
	let telephone = data.telephone;
	let item = data.item;
	let quantity = data.quantity;
	let type = data.type;

	//
	let new_requests;
	let new_tasks;
	//

	//
	let results = await requestRepository.liftRequest(vehicle_username,username,task_id);

	if(results.affectedRows>0){
		console.log('Success!');
		}
	else{
		console.log('Error!');
		}

	//
	results = await taskRepository.insertTask(task_id,username,first_name,last_name,telephone,item,quantity,type,vehicle_username);
	if(results.affectedRows>0){
		console.log('Success!');
		}
	else{
		console.log('Failure!');
		}
	//
	results = await requestRepository.getRequests(vehicle_username);
	new_requests = results;
	//
	results = await taskRepository.getTasks(vehicle_username);
	new_tasks = results;


	//
	return [new_requests,new_tasks];

	}
	catch(error){
		console.log(error);
	}
}
//
async function getTasks(vehicle_username){
	
	try{

		const tasks = await taskRepository.getTasks(vehicle_username);
		return tasks;
	}
	catch(error){
		console.log(error);
	}
}
//
async function completeTask(vehicle_username,data){
	
	try{

	let tid = data.tid;
	let item = data.item;
	let quantity = data.quantity;
	//logika kapoio type(request,offer)
	let type = data.type;
	//an type einai request meiose fortio diasosti alios an einai offer ayksise to
	let category;
	let new_tasks;
	let new_requests;
	let new_cargo;
	
		let results = await taskRepository.completeTask(tid);
		if(results.affectedRows>0){
			console.log('Success!');
		}
		else{
			console.log('Failed!');
		}
		//
		results= await requestRepository.deleteRequest(tid);
		if(results.affectedRows>0){
			console.log('Deletion Succesfull');
		}
		else{
			console.log('Deletion failed');
		}
		//
		results = await taskRepository.getTasks(vehicle_username);
		new_tasks = results;
		//
		results = await requestRepository.getRequests(vehicle_username);
		new_requests = results;
		//
		if(type == 'Request'){
			results = await inventoryRepository.updateCargo(quantity,vehicle_username,item);
		
			if(results.affectedRows>0){
				console.log('Update Succesfull');
			}
			else{
				console.log('Update failed');
			}
		
		}
		else if(type == 'Offer') {
			//
			results= await itemRepository.getCategory(item);
			category = results[0].category;
			//
			results = await inventoryRepository.updateCargoOnOffer(vehicle_username,item,quantity,category);
			//idanika epeidh borei na mhn exei sto cargo tou to item epeidh milame gia prosfora kalytera 
			if(results.affectedRows>0){//tha valo kai to category EDO THA TO FETCHARO MIA TIMH EINAI MONO ME 1 MONO APOTELESMA
				console.log('Update Succesfull');
			}
			else{
				console.log('Update failed');
			}
		
		}
		//
		results = await inventoryRepository.getCargo(vehicle_username);//HERE!
		//kai edo na gyrna kategory
		new_cargo = results;
		//
		
		console.log('New tasks: ',new_tasks);
		console.log('New requests: ',new_requests);
		console.log('New cargo: ',new_cargo);
		return [new_tasks,new_requests,new_cargo];
		//thelo kai kodika gia update cargo


	}
	catch(error){
		console.log(error);
	}
}
//

async function cancelTask(vehicle_username,tid){
	
	try{

	let new_tasks;
	let new_requests;
	//

	let results = await taskRepository.deleteTask(tid);
	if(results.affectedRows>0){
		console.log('Deleted successfully!');
	}
	else{
		console.log('Deletion Failed!');
	}
	//get the updated tasks
	results = await taskRepository.getTasks(vehicle_username);
	new_tasks = results;


	//kane fetch kai ta requests meta gia ajax update tou map me thn show_requests2
	results = await requestRepository.updateRequest(vehicle_username,tid);
	if(results.affectedRows>0){
		console.log('Updated successfully!');
	}
	else{
		console.log('Update Failed!');
	}
	//
	results = await requestRepository.getRequests(vehicle_username);
	new_requests = results;
	//
	console.log('New tasks : ',new_tasks);
	console.log('New requests : ',new_requests);
	//
	return [new_tasks,new_requests];


	}
	catch(error){
		console.log(error);
	}
}
//
module.exports = {createTask,getTasks,completeTask,cancelTask}; 
