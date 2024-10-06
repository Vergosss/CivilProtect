let map = L.map('map'); //ftaxno mono ton xarti. Den exo ta tiles, prostithentai meta
//
let tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
   });//vazo ta tiles tou OSM
tiles.addTo(map);//prostheto ta tiles tou OSM ston xarti
map.setView([38.24,21.73],16);//orizo tis syntetagmenes tou shmeiou sto opoio tha kentrarei o xarths kai to zoom level
//filtra ston xarti
var filter = L.control.layers();
filter.addTo(map);
//
//thelei to RELATIVE path
var unliftedOfferIcon = new L.Icon({
  iconUrl: '/public/img/offerunlifted.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]

});
//
var liftedOfferIcon = new L.Icon({
  iconUrl: '/public/img/offerLifted.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
//
var violetIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
//
var redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
//
var blackIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
//
var yellowIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});


var orangeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});





/*******gia na kano eggrafi ton rescuer***/
let rescuer_marker = L.marker([38.24,21.73],{draggable:true,icon:blackIcon});
rescuer_marker.bindPopup('Register');
//
var register_group = L.layerGroup();
register_group.addLayer(rescuer_marker);
filter.addOverlay(register_group,'Register');
//gia na ton vgazo ton register marker gia na mhn xalaei to map aisthitika
rescuer_marker.addEventListener('dragend',event=>{
let lat = rescuer_marker.getLatLng().lat;
let long = rescuer_marker.getLatLng().lng;
document.querySelector("#latitude").value = lat;
document.querySelector("#longitude").value = long;
console.log(lat,long);

});
//base marker
let base = L.marker([38.24,21.73],{draggable:true,icon:greenIcon});
base.bindPopup('This is a popup');// 'syndeo' ton marker me to popup
base.addTo(map);//prostheto ton marker ston xarth
//
/**********Arxikopoio ta filtra/layergroups************/
var lifted_requests = L.layerGroup();
var unlifted_requests = L.layerGroup();
var offers = L.layerGroup();
var lifted_offers = L.layerGroup();
var unlifted_offers = L.layerGroup();
var lines = L.layerGroup();
var busy_vehicles = L.layerGroup();
var free_vehicles = L.layerGroup();
/**** os admin vlepo th vash****/
fetch('/get_base/')
.then(res=>{return res.json();})
.then(data=>{
base.setLatLng([data[0]['ST_X(cords)'],data[0]['ST_Y(cords)']]);
base.bindPopup('Base');
base.addTo(map);
})
.catch(error=>{console.log('Error: ',error);})
/******************************************/

fetch('/get_current_categories/')
.then(res=>res.json())
.then(categories=>{
  //
  filter_Categories(categories);
})
.catch(error=>{console.log('Error: ',error);})

/******************************************/
fetch('/get_inventory_cargos/')
.then(res=>res.json())
.then(inventory_cargos=>{
  show_Items(inventory_cargos);
})
.catch(error=>{console.log('Error: ',error);})

/****************Get categories for item insertion category dropdown************************************/

fetch('/get_categories/')
.then(res=>res.json())
.then(categories=>{
  loadCategories(categories);
})
.catch(error=>{console.log('Error: ',error);})
/*******************Perno ta items kai ta vazo se ena select gia th dhmiourgia ths anakoinvshs********************/

fetch('/get_items/')
.then(res=>res.json())
.then(items=>{

  //
  loadItems(items);
  loadInventoryItems(items);
 
})
.catch(error=>{console.log('Error',error);})



/*******os Admin epishs vlepo olous tous diasostes/oximata****/
//
fetch('/get_vehicles/')
.then(res=>{return res.json();})
.then(Vehicles=>{
display_Vehicles(Vehicles);
//
return fetch('/fetch_requests/');
})
.then(res=>res.json())
.then(requests=>{
  display_requests2(requests,get_vehicle);
})
.catch(error=>{console.log('Error: ',error);})
/*******/

/****Epivevaiosh gia allagh ths topothesias ths vashs***/
//

var starting_lat,starting_long;
base.addEventListener('dragend', (event) => {
//dragend otan teliosei to drag kai pesei o marker sth thesh emfanizei parathyro epivevaiosis
if(confirm('Confirm Changes?')){//an patiso OK-epivevaiosi tote stelno ta trexonta cords sth vash lanontas update ta cords tou pinaka
  let lat = base.getLatLng().lat;
  let long = base.getLatLng().lng;
  console.log(lat,long);
  //
fetch('/change_base/',{
  method:'POST',
  headers: { 'Content-Type':'application/json' },
  body: JSON.stringify({
    latitude: lat,
    longitude: long
  })
})
.then(res=>{return res.json();})
.then(json=>{console.log(json);})
.catch(error=>{console.log('Error :' + error);});
//


base.bindPopup('Lat: ' + lat + ', Long: ' + long);
console.log('Lat: ' + lat + ', Long: ' + long);
}
else{
  //an akyroso thn allagh patontas cancel oi syntetagmenes tou marker einai oi proigoumenes
  //meso ths setLatLng tis ksanallazo gia na parei o marker tis arxikes prin tin allagh
  base.setLatLng([starting_lat, starting_long]);

}

});
//
/**Get initial cords and store them in case i cancel the cords change**/
base.addEventListener('dragstart',event=>{
// otan KSEKINAO na travao ton marker pare tis syntetagmenes tou(tis arxikes tou diladi)
starting_lat = base.getLatLng().lat;
starting_long = base.getLatLng().lng;
console.log(starting_lat,starting_long);
});
/****************/
function display_Vehicles(Vehicles){
let task_free_vehicles = Vehicles[0];

const free_grouped_vehicles = Object.groupBy(task_free_vehicles,function({username}){
return username;
});
//
for(let user in free_grouped_vehicles){
let vehicle_marker = L.marker([free_grouped_vehicles[user][0]['ST_X(cords)'],free_grouped_vehicles[user][0]['ST_Y(cords)']],{draggable:false,icon:orangeIcon,name:user});
let popup = document.createElement('div');
popup.innerHTML = `Vehicle username : ${user}<br><br>Cargo:<br>`;
//
popup.style['max-height'] = "200px";
popup.style['overflow-y'] = "auto";
//
for(let vec of free_grouped_vehicles[user]){
  popup.innerHTML += `${vec['item']} : ${vec['quantity']}<br>`;
}
vehicle_marker.bindPopup(popup);
free_vehicles.addLayer(vehicle_marker);
}
//
free_vehicles.addTo(map);
filter.addOverlay(free_vehicles,"Free Vehicles");
//
/******************************/
let task_busy_vehicles = Vehicles[1];

const busy_grouped_vehicles = Object.groupBy(task_busy_vehicles,function({username}){
return username;
});
//
for(let user in busy_grouped_vehicles){
let vehicle_marker = L.marker([busy_grouped_vehicles[user][0]['ST_X(cords)'],busy_grouped_vehicles[user][0]['ST_Y(cords)']],{draggable:false,icon:redIcon,name:user});
let popup = document.createElement('div');
popup.innerHTML = `Vehicle username : ${user}<br><br>Cargo:<br>`;
//
popup.style['max-height'] = "200px";
popup.style['overflow-y'] = "auto";
//
for(let vec of busy_grouped_vehicles[user]){
  popup.innerHTML += `${vec['item']} : ${vec['quantity']}<br>`;
}
vehicle_marker.bindPopup(popup);
busy_vehicles.addLayer(vehicle_marker);
}
//
busy_vehicles.addTo(map);
filter.addOverlay(busy_vehicles,"Busy Vehicles");
//
}
//

//
/**********/
function display_requests2(requests,get_vehicle){
//
const grouped_requests = Object.groupBy(requests,function({username}){
  return username;
});
//
for(let user in grouped_requests){
//
let request_marker = L.marker([grouped_requests[user][0]['ST_X(cords)'],grouped_requests[user][0]['ST_Y(cords)']],{draggable:false});
let popup = document.createElement('div');
//
popup.setAttribute('class','popups');
//
popup.style['max-height'] = "200px";
popup.style['overflow-y'] = "auto";
//
for (let request of grouped_requests[user]){
let request_div = document.createElement('div');
request_div.innerHTML = `Name : ${request['citizen_first_name']},${request['citizen_last_name']}<br>Telephone: ${request['citizen_telephone']}<br>Entry: ${((new Date(request['entry_date'])).toLocaleString('el-GR')).replace(',',' ')}<br>Item: ${request['item']}<br>Quantity: ${request['quantity']}<br>Type: ${request['type']}<br>`;
//
request_div.setAttribute('class','marker_text');


if(request['lifted'] && request['type'] == 'Request'){
  request_div.innerHTML += `<br>Withdrawal date: ${new Date(request['withdrawal_date']).toLocaleString('el-GR').replace(',',' ')}<br>Vehicle: ${request['vehicle_username']}<br>`;
  request_marker.setIcon(yellowIcon);//diaforetiko xroma gia ta pros diaikperaiosi requests
  //
  let cords = [[request['ST_X(cords)'],request['ST_Y(cords)']],[get_vehicle(request['vehicle_username']).lat,get_vehicle(request['vehicle_username']).lng]];
  let line = L.polyline(cords,{color:'green'});
  //line.addTo(map);//sundese to aithma pou exei analifthei me ton diasosti tou
  lines.addLayer(line);
}
else if(request['type'] == 'Offer' && request['lifted']){
  request_marker.setIcon(liftedOfferIcon); //to lifted offer ti xroma tha exei
  
  // 
  request_div.innerHTML += `<br>Withdrawal date: ${new Date(request['withdrawal_date']).toLocaleString('el-GR').replace(',',' ')}<br>Vehicle: ${request['vehicle_username']}`;
  let cords = [[request['ST_X(cords)'],request['ST_Y(cords)']],[get_vehicle(request['vehicle_username']).lat,get_vehicle(request['vehicle_username']).lng]];
  let line = L.polyline(cords,{color:'green'});
  //line.addTo(map);//sundese to aithma pou exei analifthei me ton diasosti tou
  lines.addLayer(line);
  
}
else if(request['type'] == 'Offer' && !(request['lifted'])){
  //unlifted Offer
  request_marker.setIcon(unliftedOfferIcon);
}

//
popup.appendChild(request_div);
//

}
//
request_marker.bindPopup(popup,{className:'markerpopup'});
request_marker.addTo(map);
//
}

lines.addTo(map);
filter.addOverlay(lines,'Connections');


}
/********/

/**********/
function get_vehicle(vehicle_username){
  //pairno ta cords tou oximatos me aytes tis syntetagmenes
let cords;
busy_vehicles.eachLayer(marker=>{//edo einai to thema
if(marker.options.name == vehicle_username){
  cords = marker.getLatLng();
}
});
return cords;
}
/*************************/
function show_Items(inventory_cargos){
  let inventory = inventory_cargos[0];
  let cargos = inventory_cargos[1];
  const inventory_body = document.querySelector("#inventory_body");
  inventory_body.innerHTML = "";//clear
  let allBodies = document.querySelectorAll("#items tbody");
//EDO
  for(let x of allBodies){
    x.innerHTML = "";
  }
  //Add the inventory
  for(let product of inventory){
    let tr = document.createElement('tr');
    for(let key in product){
      let td = document.createElement('td');
      td.innerHTML = product[key];
      tr.appendChild(td);
      if(key == 'category') td.style.display = 'none'; 
    }
    inventory_body.appendChild(tr);
  }
  //Add the cargos
  //kano groupby ta cargos vash to username
  //kai diatrexo ayto to array
const table = document.querySelector("#items");
const grouped_cargos = Object.groupBy(cargos,function({username}){
return username;
});
//
for(let username in grouped_cargos){
// kathe pinakas exei to poly 1 thead ara ta vazo ola sto body

  let tbody = document.createElement('tbody');
  //
  let vehicle_tr = document.createElement('tr');
  let th = document.createElement('th');
  th.innerHTML = username;//to onoma tou oximatos
  th.setAttribute('colspan','2');
  //
  vehicle_tr.appendChild(th);//vale to table header me to onoma tou oximatos sth grammh
  tbody.appendChild(vehicle_tr);
  //
  let item_tr = document.createElement('tr');
  let item_th = document.createElement('th');
  let quantity_th = document.createElement('th');
  item_th.innerHTML = 'Item';
  quantity_th.innerHTML = 'Quantity';
  item_tr.appendChild(item_th);
  item_tr.appendChild(quantity_th);
  tbody.appendChild(item_tr);
//
  //body work
  //
  for(let product of grouped_cargos[username]){
    let tr = document.createElement('tr');
    for(let key in product){
      if(key == 'username') continue;
      let td = document.createElement('td');
      td.innerHTML = product[key];
      tr.appendChild(td);
      if(key == 'category') td.style.display = 'none';
    }
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
}

}
//

/************************Filter table data per categories*******/

function filter_Items(){

const checkboxes = document.querySelectorAll(".filter");
let current_values = [];
for(let box of checkboxes){
  if(box.checked){
    current_values.push(box.value);//poies times exoun klikaristei?
  }
}
console.log(current_values);
/*******/
const bodies = document.querySelectorAll("#items tbody");
//perno ola ta bodies tou pinaka
//#items tbody einai o css selector pou pernei ola ta tbody elements pou exoun patera to element me id items
console.log(bodies);
//
for(let body of bodies){

  if(!current_values.length){//an einai ola untickarismena tote emfanizontai ola ta items
    for(let row of body.rows) row.style.display="";
  }
  else{
    for(let row of body.rows){
    let ths = row.getElementsByTagName('th').length;
    if(ths>0) continue;//an den vriskomai se grammh me apokleistika mono td elements proxora sthn epomenh grammh
      //anti na psaxno kathe keli tsekaro tin timh px tou teleytaiou keliou px tou 3ou
      if(current_values.indexOf(row.cells[2].innerHTML) > -1){
      row.style.display =  "";
      }
      else{
        row.style.display = "none";
      }
    
  }
  }

}
//
}

//
function filter_Categories(categories){
const filter_categories_table = document.querySelector("#filter_categories");
//
filter_categories_table.innerHTML = "";//katharizo ton pinaka gia epanaxrisimopoihsh
//
let th = document.createElement('th');
th.setAttribute('colspan',categories.length);
th.innerHTML = 'Filter Inventory/Cargos by Category' ;
filter_categories_table.appendChild(th);
//
let tr = document.createElement('tr');
for(let category of categories){
  let td = document.createElement('td');
  let checkbox = document.createElement('input');
  checkbox.setAttribute('type','checkbox');
  checkbox.setAttribute('class','filter');
  //
  td.innerHTML = category['category_name'];
  checkbox.value = category['category'];
  td.appendChild(checkbox);
  tr.appendChild(td);
}
//
filter_categories_table.appendChild(tr);
//
const boxes = document.querySelectorAll(".filter");
for(let box of boxes){
  box.addEventListener('click',filter_Items);
}
}

/****************Add a category*********************/

//add category insertion form
const addCategoryForm = document.querySelector(".category");
addCategoryForm.addEventListener('submit',addCategory);
//
function addCategory(event){
event.preventDefault();//akyrono to event gia na mh kanei refresh th selida
//
let category = document.querySelector("#category_name").value;
let id = document.querySelector("#category_id").value;
console.log(category);

if(isNaN(id) || id>=0 || !(Number.isInteger(Number(id)))){
//boro na valo px arnitika ta id pou vazo ego gia na mhn exo sygkrousi me ta thetika ids pou kano import
  alert('Id must be a negative integer number!');
  return;
}
//
this.reset();
//
fetch('/add_category/',{
  method: 'POST',
  headers: {
      'Content-Type': 'application/json'
    },
  body:JSON.stringify({
    //isos id oxi akoma
    id:id,
    category:category //onoma kathgorias
  })
})
.then(res=>res.json())
.then(categories=>{
  loadCategories(categories);
  alert('Done!');
})
.catch(error=>{console.log('Error: ',error);})

//
}

/*******************Add Item***********/
const addItemForm = document.querySelector(".items");
addItemForm.addEventListener('submit',addItem);
///
function addItem(event){
event.preventDefault();
//
let item = document.querySelector("#item_name").value;
let id = document.querySelector("#item_id").value;
let category = document.querySelector("#item_category_name").value;
//
if(isNaN(id) || !(Number.isInteger(Number(id))) || id>=0){
//boro na valo px arnitika ta id pou vazo ego gia na mhn exo sygkrousi me ta thetika ids pou kano import
  alert('Id must be a negative integer number!');
  return;
}
//
this.reset();
//
fetch('/add_item/',{
  method: 'POST',
  headers: {
      'Content-Type': 'application/json'
    },
  body:JSON.stringify({
    //isos id oxi akoma
    id:id,
    item:item,
    category:category
    //meta ta details
  })
})
.then(res=>res.json())
.then(items=>{
  //
  loadItems(items);
  loadInventoryItems(items);
  alert('Done!');
})
.catch(error=>{console.log('Error: ',error);})

}
/*****************Fortose tis katigories gia to dropdown sthn eisagogi item********************/
function loadCategories(categories){

  const category_name = document.querySelector(".items  #item_category_name");//perno to select
  category_name.innerHTML = "";
  for(let category of categories){
    let option = document.createElement('option');
    option.value = category['id'];
    option.innerHTML = category['category_name'];
    //
    category_name.appendChild(option);
  }
  //
}
/**********************Fortose ta antikeimena sto dropdown ton anakoinvseon*****/

function loadItems(items){

  const announcement_items = document.querySelector(".announcement_items");
  announcement_items.innerHTML = "";
  for(let item of items){
    let label = document.createElement('label');
    //
    label.innerHTML = item['name'];
    let checkbox = document.createElement('input');
    checkbox.setAttribute('type','checkbox');
    label.appendChild(checkbox);
    announcement_items.appendChild(label);

  }
}
/******************************************************************************/

function loadInventoryItems(items){

let inventory_items = document.querySelector("#inventory_items");
inventory_items.innerHTML = "";
for(let item of items){
let option = document.createElement('option');
//
const value_data = `{"name":"${item['name']}","category":"${item['category']}"}`;
    //
option.value = value_data;
//
option.innerHTML = item['name'];
inventory_items.appendChild(option);

}
//
}
/******************************************Modify Inventory*******************************/

const update_inventory_form = document.querySelector(".update_inventory_form");
update_inventory_form.addEventListener('submit',modifyInventory);
//
function modifyInventory(event){
event.preventDefault();
//
let adding_item = JSON.parse(document.querySelector("#inventory_items").value).name;
let adding_category =  JSON.parse(document.querySelector("#inventory_items").value).category;
//pare kai to category se periptosi pou den yparxei sto inventory
let adding_quantity = document.querySelector("#adding_quantity").value;
//elegxos gia egkyrothta ti edosa
if(isNaN(adding_quantity) || adding_quantity<=0 || !(Number.isInteger(Number(adding_quantity)))) {
  alert('Quantity must be a positive integer number!');
  return;
}
//
this.reset();


//
fetch('/modify_inventory/',{
method: 'POST',
headers:{
	'Content-Type':'application/json'
},
body:JSON.stringify({
//
adding_item:adding_item,
adding_quantity:adding_quantity,
adding_category:adding_category
})
})
.then(res=>res.json())
.then(inventory_cargos_categories=>{
let inventory_cargos = [inventory_cargos_categories[0],inventory_cargos_categories[1]];
//update inventory cargo table
show_Items(inventory_cargos);
//update filter table
let updated_categories = inventory_cargos_categories[2];
filter_Categories(updated_categories);
})
.catch(error=>{console.log('Error: ',error);})

//
}


/***************Otan klikaroume to neo 'select' tote emfanizontai oi epiloges*************/

const item_select = document.querySelector(".item_select");
item_select.addEventListener('click',showDropDown);
function showDropDown(){

const announcement_items = document.querySelector(".announcement_items");

if(announcement_items.style.display == 'none')
 {//an to dropdown den exei emfanistei opos px sthn arxh ths fortosis ths selidas tote emfanise tis epiloges
  announcement_items.style.display = 'block';
}
else 
{//alios an to exo hdh aniksei to dropdown kleisto gia eksikonomisi xorou
announcement_items.style.display = "none";
}
//gyrizo to div me ta checkboxes sth default emfanisi tou pou einai ena block element
}

/*********************gia th dimiourgia tis anakoinosis**********************/
const submit_announcement_form = document.querySelector(".submit_announcement");
//
submit_announcement_form.addEventListener('submit',createAnnouncement);
//

function createAnnouncement(event){
event.preventDefault();
//
let text = document.querySelector("#announcement_text").value;

//
const labels = document.querySelectorAll(".announcement_items label");
let items = [];

for(let label of labels){
if(label.children[0].checked){
items.push(label.innerText);
}
}
items = items.toString();//metatrepo to array se string gia na to valo sth vash
//
this.reset();
//exo oloklirosei ta items

fetch('/create_announcement/',{
  method: 'POST',
  headers: {
      'Content-Type': 'application/json'
    },
  body:JSON.stringify({
  text:text,
	items:items
  })
})
.then(res=>res.json())
.then(results=>{
//
alert(results['msg']);
})
.catch(error=>{console.log('Error: ',error);})

//
}

/***********Rescuer addition*****************/
const registerRescuerForm = document.querySelector(".register-rescuer form");
registerRescuerForm.addEventListener('submit',registerRescuer);

//
function registerRescuer(event){

  event.preventDefault();
  //
  let username = this.children[1].value;
  let password = this.children[3].value;
  let firstname= this.children[5].value;
  let lastname = this.children[7].value;
  let telephone = this.children[9].value;
  let latitude = this.children[10].value;
  let longitude = this.children[11].value;
  //clear the form
  this.reset();
  // send the rescuer's form data to database
  fetch('/register_rescuer/',{
  method: 'POST',
  headers: {
      'Content-Type': 'application/json'
    },
  body:JSON.stringify({
   username:username,
   password:password,
   firstname:firstname,
   lastname: lastname, 
   telephone:telephone,
   latitude:latitude,
   longitude:longitude
  })
})
.then(res=>res.json())
.then(results=>{
  //alert the admin about the insertion's success or failure
  alert(results['msg']);
})
.catch(error=>{console.log('Error: ',error);})

}




/************************Chart-Arxika kapoia grafimata********/
fetch('/graph/')
.then(res=>res.json())
.then(requests=>{
  //Graph(requests);
})
.catch(error=>{console.log('Error: ',error);})



/************Synarthsh pou paragei ta grafimata**********/
function Graph(requests){
const ctx = document.querySelector("#graph");//perno ton canva
//
let new_requests = requests[0];
let new_offers = requests[1];
let completed_requests = requests[2];
let completed_offers = requests[3];
//
if(Chart.getChart(ctx)) Chart.getChart(ctx).destroy();//an o canvas exei kapoio chart kane to destroy adeiase ton diladi
//
//chart antikeimeno me orismata ton canva, kai ena object me pedia: ton typo tou grafimatos,ta dedomena tou, rythmiseis klp
const chart = new Chart(ctx,{
  type: 'doughnut',
  data: {
    labels:[
    'New Requests',
    'New Offers',
    'Completed Requests',
    'Completed Offers'
    ]
    ,
   //o aksonas x ousiastika(oi times tou)
    datasets:[{
      label: 'Number',
      data: [(new_requests.map(req=>req.requests)).reduce((sum,current)=>sum+current,0),(new_offers.map(offr=>offr.offers)).reduce((sum,current)=>sum+current,0),(completed_requests.map(req=>req.requests)).reduce((sum,current)=>sum+current,0),(completed_offers.map(offr=>offr.offers)).reduce((sum,current)=>sum+current,0)], // o aksonas y ousiastika(oi times tou)
      backgroundColor: ['Red','Yellow','Green','Blue'],//xroma ths baras(esoteriko)
      borderColor: 'rgba(150, 100, 255, 1)',//xroma perigrammatos baras
      //borderWidth: 1//eyros(paxos ths baras)
    }
  ]
  },
  options: {}
}); 



}
//
/******************************/
//

//
const graph_button = document.querySelector("#graph_button");
graph_button.addEventListener('click',getGraphs);
//
function getGraphs(){
let first_date = document.querySelector("#first").value;
let second_date = document.querySelector("#second").value;
console.log(first_date); 
//
console.log(second_date);
if(!first_date && !second_date){
  alert('Invalid Dates!');
  return;
}

sendDates(first_date,second_date);
}
/*******************/
function sendDates(start,end){
//
fetch('/get_dates/',{
  method:'POST',
  headers: { 'Content-Type':'application/json' },
  body: JSON.stringify(
    {
      start:start,
      end:end
    }
  
  )
})
.then(res=>res.json())
.then(requests=>{
//  
    Graph(requests);
})
.catch(error=>{console.log('Error: ',error);})


//
}
/****************Upload arxeio ton eidon***********/
let uploadForm = document.querySelector("#upload_form");
uploadForm.addEventListener('submit',uploadProducts);
//
function uploadProducts(event){
event.preventDefault();
let products = document.querySelector("#upload").files[0];
console.log(products);
//
const ProductData = new FormData();//dimiourgo ena formdata object me key=file kai value to arxeio(kleidi-timh)
ProductData.append('file',products);
//
this.reset();
//
fetch('/upload_products/',{
method:'POST',
body:ProductData
})
.then(res=>res.json())
.then(results=>{
  alert(results['msg']);
})
.catch(error=>{console.log('Error: ',error);})
//
}

/*******************/
//an patithei to koubi kano fetch ta proionta me amesh klhsh sto url 
const itemsbutton = document.querySelector("#itemsbutton");
itemsbutton.addEventListener('click',async ()=>{
//lyno to cors me th xrhsh enos proxy server
try{
let res = await fetch('https://cors-anywhere.herokuapp.com/'+'http://usidas.ceid.upatras.gr/web/2023/export.php');
let data = await res.json();
//
//
res = await fetch('/update_products/',{
  method:'POST',
  headers: { 'Content-Type':'application/json' },
  body: JSON.stringify(
  data
  )
});
let results = await res.json();
alert(results['msg']);
}
catch(error){
  console.log('Error: ',error);
}
});