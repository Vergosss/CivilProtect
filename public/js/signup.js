let map = L.map('map');
let tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
   });//vazo ta tiles tou OSM
tiles.addTo(map);//prostheto ta tiles tou OSM ston xarti
map.setView([38.24,21.73],16);//orizo tis syntetagmenes tou shmeiou sto opoio tha kentrarei o xarths kai to zoom level


//ftiaxno enan marker


let marker = L.marker([38.24,21.73],{draggable:true});
marker.bindPopup('Move this marker to your location');// 'syndeo' ton marker me to popup
marker.addTo(map);//prostheto ton marker ston xarth


//event lsitener gia na updataroun ta cords tou marker kathe fora pou ton travao kai alazei thesh
marker.addEventListener('dragend', (event) => {
let lat = marker.getLatLng().lat;
let long = marker.getLatLng().lng;
document.querySelector("#latitude").value = lat;
document.querySelector("#longitude").value = long;
marker.bindPopup('Lat: ' + lat + ', Long: ' + long);
console.log('Lat: ' + lat + ', Long: ' + long);
});
/*******************/
const signupForm = document.querySelector(".signup form");
signupForm.addEventListener('submit',SignUp);
/*******************/
function SignUp(event){
event.preventDefault();

//
let username = document.querySelector("#username").value;
let password = document.querySelector("#password").value;
let firstname = document.querySelector("#firstname").value;
let lastname = document.querySelector("#lastname").value;
let telephone = document.querySelector("#telephone").value;
let latitude = document.querySelector("#latitude").value;
let longitude = document.querySelector("#longitude").value;
//
this.reset();//katharizo th forma
//
fetch('/signup/',{
  method: 'POST',
  headers: {
      'Content-Type': 'application/json'
    },
  body:JSON.stringify({
    username:username,
    password:password,
    firstname:firstname,
    lastname:lastname,
    telephone:telephone,
    latitude:latitude,
    longitude:longitude
  })
})
.then(res=>res.json())
.then(results=>{

alert(results['msg']);
})
.catch(error=>{console.log('Error: ',error);})

//to idio me to signup
}

//