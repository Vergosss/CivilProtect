const express = require("express");//import express module
const session = require('express-session');//module gia ta sessions
const bodyParser = require('body-parser'); // middleware- alios vivliothiki gia na prospelayno to body tou post request
//routes
const announcementRoutes = require("./routes/announcement.routes");
const geospatialRoutes = require("./routes/geospatial.routes");
const inventoryRoutes = require("./routes/inventory.routes");
const itemRoutes = require("./routes/item.routes");
const offerRoutes = require("./routes/offer.routes");
const requestRoutes = require("./routes/request.routes");
const statisticsRoutes = require("./routes/statistics.routes");
const taskRoutes = require("./routes/task.routes");
const userRoutes = require("./routes/user.routes");

//
const app = express();//express object app
//
app.use('/public',express.static('public'));
//serve all files in the directory /public
//
//arxikopoio to session-!!an de to valo to session einai undefined kai peta errors sthn post
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
	//cookie: { maxAge: 60000 } // session timeout of 60 seconds-an perasei 1 lepto prepei na ksanakano login-katastrefei to session
}));
//
app.use((req,res,next)=>{
res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
next();
});
//
app.use(bodyParser.urlencoded({ extended: true }));
//
app.use(express.json());//xoris ayto den kodikopoiountan ta dedomena kai gyrnage undefined cords sto backend
//
app.use("/",announcementRoutes);
app.use("/",geospatialRoutes);
app.use("/",inventoryRoutes);
app.use("/",itemRoutes);
app.use("/",offerRoutes);
app.use("/",requestRoutes);
app.use("/",statisticsRoutes);
app.use("/",taskRoutes);
app.use("/",userRoutes);

//
module.exports = app;