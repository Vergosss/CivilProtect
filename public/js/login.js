let LoginForm = document.querySelector(".login form");
LoginForm.addEventListener('submit',LogIn);

function LogIn(event){
event.preventDefault();
//
let username = document.querySelector("#username").value;
let password = document.querySelector("#password").value;
//
fetch('/login/',{
  method: 'POST',
  headers: {
      'Content-Type': 'application/json'
    },
  body:JSON.stringify({
    username:username,
    password:password
  })
})
.then(res=>res.json())
.then(results=>{
if(results['msg'] == "Success"){

window.location.href = '/home/';
}
else if(results['msg'] == "Failure"){
alert('Wrong username and/or password');
}

//
})
.catch(error=>{console.log('Error: ',error)})

//to idio me to signup
}