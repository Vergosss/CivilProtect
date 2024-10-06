let map = L.map('map'); //ftaxno mono ton xarti. Den exo ta tiles, prostithentai meta

let tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
   });//vazo ta tiles tou OSM
tiles.addTo(map);//prostheto ta tiles tou OSM ston xarti
map.setView([38.24,21.73],16);//orizo tis syntetagmenes tou shmeiou sto opoio tha kentrarei o xarths kai to zoom level
//



/*************************************/
let base = L.marker([38.24,21.73],{draggable:false});
/*********************/
fetch('/get_base/')
.then(res=>{return res.json();})
.then(data=>{
base.setLatLng([data[0]['ST_X(cords)'],data[0]['ST_Y(cords)']]);
base.bindPopup('Base');
base.addTo(map);
})
.catch(error=>{console.log('Error: ',error);})
/****************/
/*****os admin vlepo th vash****/


/********fetch tis katigories ton proionton gia na fortothoun se ena dropdown menu***/
fetch('/get_categories/')
.then(res=>res.json())
.then(categories=>{
//
  loadCategories(categories);
})
.catch(error=>{console.log('Error: ',error);})
//


/********fetch ta idia ta proionta gia na fortothoun se ena dropdown menu**/
fetch('/get_items/')
.then(res=>res.json())
.then(items=>{
  //
  loadItems(items);
  
})
.catch(error=>{console.log('Error: ',error);})
//
/******perno ta cords tou polith gia xrhsh metepeita**/
var lat,long; 
let request_marker = L.marker([38.24,21.73],{draggable:false}); 
fetch('/get_coordinates/')
.then(res=>res.json())
.then(cords=>{
  lat = cords[0]['ST_X(cords)'];
  long = cords[0]['ST_Y(cords)'];
  //
  request_marker.setLatLng([lat,long]);
  request_marker.addTo(map);
})
.catch(error=>{console.log('Error: ',error);})

 /*****/
/******Dimiourgia aithmatos apo ton polith******/
//var requested_item;
let popup = document.createElement('div');

const request_button = document.querySelector("#request");
request_button.addEventListener('click',Request);

/*******************Create request************************/
function Request(){
//
let requested_item = JSON.parse(document.querySelector("#items").value).name;//
console.log(requested_item);
let requested_quantity = document.querySelector("#request_quantity").value;
if(isNaN(requested_quantity) || requested_quantity<=0 || !(Number.isInteger(Number(requested_quantity)))) {
  alert('Quantity must be a positive number!');
  return;
}
console.log(requested_quantity);
//

fetch('/request/',{
  method:'POST',
  headers: { 'Content-Type':'application/json' },
  body: JSON.stringify({
    item: requested_item,
    quantity:requested_quantity
    //lat: lat,
    //long: long 
  })

})
.then(res=>res.json())
.then(data=>{
//

})
.catch(error=>{console.log('Error: ',error);})

//
}

/*******Provoli ton aitimaton tou xristi(san istoriko)**/
fetch('/receive_requests/')
.then(res=>res.json())
.then(requests=>{
//
myRequests(requests);

})
.catch(error=>{console.log('Error: ',error);})
/**************Get requests*******************/
function myRequests(requests){
//
let untaken_requests = requests[0];
let taken_requests = requests[1];
let completed_requests = requests[2];

//
const requests_body = document.querySelector('#requests_body');
requests_body.innerHTML = "";
//untaken requests
for(let req of untaken_requests){

let tr = document.createElement('tr');
for(let key in req){
  let td = document.createElement('td');
  //elegxos gia an einai date kai antistixa gia na fertho analogos
   td.innerHTML = req[key];//default gia alla dedomena
   //
   tr.appendChild(td);
}
//
  let withdrawal_date = document.createElement('td');
  let complete_date = document.createElement('td');
  withdrawal_date.innerHTML = '-';
  complete_date.innerHTML = '-';
  tr.appendChild(withdrawal_date);
  tr.appendChild(complete_date);
requests_body.appendChild(tr);
}
//taken but not completed requests(active tasks)

for(let req of taken_requests){
  let tr = document.createElement('tr');
  //
  for(let key in req){
    let td = document.createElement('td');
    if(key == 'withdrawal_date'){
      td.innerHTML = (new Date(req[key])).toLocaleString('el-GR').replace(',',' ');
    }
    else{
      td.innerHTML = req[key];
    }
    //
    tr.appendChild(td);
  }
  //
  let complete_date = document.createElement('td');
  complete_date.innerHTML = '-';
  tr.appendChild(complete_date);
  //
  requests_body.appendChild(tr);
  //
 
}


//completed
for(let req of completed_requests){
  let tr = document.createElement('tr');
  //
  for(let key in req){
    let td = document.createElement('td');
    if(key == 'entry_date' || key == 'complete_date'){
      td.innerHTML = (new Date(req[key])).toLocaleString('el-GR').replace(',',' ');
    }
    else{
      td.innerHTML = req[key];
    }
    //
    tr.appendChild(td);
  }
  //

  //
  requests_body.appendChild(tr);
  //
 
}

}
/********************Get offers******/
fetch('/receive_offers/')
.then(res=>res.json())
.then(offers=>{
  //
 myOffers(offers);
})
.catch(error=>{console.log('Error: ',error);})
/*************Provoli ton Prosforon**************/
function myOffers(offers){
//
let untaken_offers = offers[0];
let taken_offers = offers[1];
let completed_offers = offers[2];
const offers_body = document.querySelector('#offers_body');
offers_body.innerHTML = "";
//free offers
for(let offr of untaken_offers){
//if(!(untaken_offers.length)) break;
let tr = document.createElement('tr');
for(let key in offr){
  let td = document.createElement('td');
  //elegxos gia an einai date kai antistixa gia na fertho analogos
   td.innerHTML = offr[key];//default gia alla dedomena
   //
   tr.appendChild(td);
}
//
  let withdrawal_date = document.createElement('td');
  let complete_date = document.createElement('td');
  withdrawal_date.innerHTML = '-';
  complete_date.innerHTML = '-';
  tr.appendChild(withdrawal_date);
  tr.appendChild(complete_date);
offers_body.appendChild(tr);
}
//lifted but not completed offers(in progress)

for(let offr of taken_offers){
  //
//if(!(taken_offers.length)) break;
//
let tr = document.createElement('tr');
for(let key in offr){
  let td = document.createElement('td');
  //elegxos gia an einai date kai antistixa gia na fertho analogos
  if(key == 'withdrawal_date'){
      td.innerHTML = (new Date(offr[key])).toLocaleString('el-GR').replace(',',' ');
    }
    else{
      td.innerHTML = offr[key];
    }
    tr.appendChild(td);
}
//
  let complete_date = document.createElement('td');
  //
  complete_date.innerHTML = '-';
  tr.appendChild(complete_date);
  
offers_body.appendChild(tr);
}

//completed offers
for(let offr of completed_offers){
//

//
let tr = document.createElement('tr');
for(let key in offr){
  let td = document.createElement('td');
  //elegxos gia an einai date kai antistixa gia na fertho analogos
  if(key == 'entry_date' || key == 'complete_date'){
      td.innerHTML = (new Date(offr[key])).toLocaleString('el-GR').replace(',',' ');
    }
    else{
      td.innerHTML = offr[key];
    }
   //
   tr.appendChild(td);
}
offers_body.appendChild(tr);
}



}

/*****Get Announcements from Base*****/
fetch('/get_announcements/')
.then(res=>res.json())
.then(announcements=>{
//
displayAnnouncements(announcements);
})
.catch(error=>{console.log('Error: ',error);})
/**********************************/
const submit_offer = document.querySelector("dialog");
submit_offer.addEventListener('close',Offer);
//

const offer_quantity = document.querySelector("#offer_quantity");
offer_quantity.addEventListener('input',changeOfferValue);

/********pernei tis anakoinvseis kai tis parousizei ston polith(OLES OI SYNARTHSEIS - TO Declararion tous ginetai hoisted)************/

function displayAnnouncements(announcements){
//
const citizen_announcements = document.querySelector(".citizen_announcements");
//
    for(let announcement of announcements){

        let announcement_div = document.createElement('div');
        //
        let announcement_text = announcement['text'];
        let announcement_date = `Uploaded: ${((new Date(announcement['create_date'])).toLocaleString('el-GR')).replace(',',' ')}`;
        let announcement_items = announcement['items'].split(',');
//boro na valo overflow sto oliko div ton anakoinoseon gia na boro na pao se kathe mia

      let date_span = document.createElement('span');
      date_span.innerHTML=announcement_date;
      announcement_div.appendChild(date_span);
      //
      let text_p = document.createElement('p');
      text_p.innerHTML=announcement_text;
      announcement_div.appendChild(text_p);
      //logika tha valo span gia to span tha to stylaro na fainetai san tag kai tha ginei clickable-kai meta isos disabled
      
      for(let item of announcement_items){
        let item_span = document.createElement('span');
        item_span.setAttribute('class','item_spans')
        item_span.innerHTML = item;
        announcement_div.appendChild(item_span);
        //
        item_span.addEventListener('click',function(){
          let submit_offer = document.querySelector('dialog');
          submit_offer.setAttribute('item',this.innerHTML);
          submit_offer.showModal();
        });
        //
      }
      //menoun ta items ths anakoinvshs
      citizen_announcements.appendChild(announcement_div);

      }

}
/**********************Offer function********************************/

function Offer(){
if(this.returnValue == 'cancel' || isNaN(this.returnValue) || this.returnValue <=0 || !(Number.isInteger(Number(this.returnValue))))//edo epeidh den einai .value to returnvalue einai string kai h isinteger('1') epistrefei false
{
alert('Offered amount must be a positive integer!');
return;
}
//
console.log(this.returnValue);

//perno kai to item attribute tou dialog kai to stelno sth vash
console.log(this.getAttribute('item'));

//
fetch('/offer/',{
  method:'POST',
  headers: { 'Content-Type':'application/json' },
  body: JSON.stringify({
    item: this.getAttribute('item'),
    quantity:this.returnValue
    //lat: lat,
    //long: long 
  })

})
.then(res=>res.json())
.then(results=>{
//afou kano insert to request sth vash
//tote enimerose ton marker
alert(results['msg']);
})
.catch(error=>{console.log('Error: ',error);})

//
}
/********************Change button's value*******************/

function changeOfferValue(){
  this.form.elements.confirm.value = this.value;
  //ousiastika h timh pou vazo sto input text pernaei os timh tou confirm button
  //opote meta otan kleisei to dialog-close event tha epistrafei h timh pou edosa
}

/**************Fortosi katigorion oste na tis vlepei o poliths***************/
function loadCategories(categories){

const categories_menu = document.querySelector('#categories');
//
categories_menu.innerHTML = "";
for(let cat of categories){
let option = document.createElement('option');
option.innerHTML = cat['category_name'];
option.value = cat['id'];
categories_menu.appendChild(option);//prosthese kathe option sto select menu
}

categories_menu.addEventListener('input',filterItems);//isos kai oninput
//
}
/***********************************/
function filterItems(){
  //pare thn kathgoria pou epelekses apo to select
  let category = document.querySelector("#categories").value;
  //vash ayths filtrare ta values tou deyterou select diladi ta items
  const item_options = document.querySelectorAll('#items option');
  //
  for(let option of item_options){
    
    if(JSON.parse(option.value).category == category){
      option.style.display = "";
    }
    else{
      option.style.display = "none";
    }
  }

  //
}

/******Fortosi proionton oste na ta vlepei o poliths***/

function loadItems(items){
//
const items_menu = document.querySelector('#items');
//
items_menu.innerHTML = "";
//
  //
  for(let item of items){
    let option = document.createElement('option');
    option.innerHTML = item['name'];
    //borei na parei px ena object typou {'name': val,'category':value}
    const value_data = `{"name":"${item['name']}","category":"${item['category']}"}`;
    //
    option.value = value_data;
    //
    items_menu.appendChild(option);
  }

//
}
/**************************/



/**************************/