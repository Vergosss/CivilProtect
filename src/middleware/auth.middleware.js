function LoggedIn(req,res,next){
	if(req.session.username){
		//an eisai loggedin synexise sto epomeno middleware
		return next(); // to return termatizei ton kodika ayths synarthshs-middlewarre-exyphreth
	}
	else{
		res.redirect('/');//if the user is not logged in trying to access any endpoint redirects to the login page
	}
}
module.exports = {LoggedIn};