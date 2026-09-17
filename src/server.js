const port = 3000;
app = require("./app");//app.js or ./src/app depending if server.js is on the root
app.listen(port,() => {
    console.log(`Listening on port ${port}!`);
  });