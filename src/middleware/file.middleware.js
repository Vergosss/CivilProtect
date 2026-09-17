const multer = require("multer");//module for file uploading

const storage = multer.diskStorage({
	destination: function (req, file, callback) {
	  callback(null, './uploads/');
	},
	filename: function (req, file, callback) {
	  callback(null, file.fieldname + '-' + Date.now() + '.json');
	}
  });
const upload = multer({ storage: storage });//to id tou file sto form
module.exports = {upload};