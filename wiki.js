// wiki.js - Wiki route module
//edo ftiaxno ena diko mou module to wiki
const express = require("express");//fortono to express module
const router = express.Router();//dimiourgo ena express router object

// Home page route
router.get("/", function (req, res) {
  res.send("Wiki home page");// h callback kalleitai kathe fora pou yparxei
});
//http GET request sth selida me path: /wiki/
// About page route
router.get("/about", function (req, res) {
  res.send("About this wiki");
});
//kalista me alles methodous px router.post() mono gia post requests
//edo h callback kalleitai kathe fora pou exo http get request sthn selida /wiki/about
// ta orismata einai: http request/aitima, http response
module.exports = router;
