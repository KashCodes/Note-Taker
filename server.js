// required package/constructor/module
const express = require('express');
// Initalize the server, to tell it to listen for requests
const app = express();
// tell our app (heroku) to use that port, if it has been set, and if not, default to port 80.
const PORT = process.env.PORT || 3005;

// Setup data parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static('public'));

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// listen for server
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});