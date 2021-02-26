// required package/constructor/module
const express = require('express');
const fs = require('fs');
const path = require('path');

// instantiate the server, to tell it to listen for requests
const app = express();
// tell our app (heroku) to use that port, if it has been set, and if not, default to port 80.
const PORT = process.env.PORT || 3005;

const { db } = require('./db/db.json');

//-----------------Middleware Start-----------------//
const nocache = require("nocache");

app.use(nocache());
app.set('etag', false);
//-----------------Middleware End-----------------//


// route that the front-end can request data from
app.get('/db/db', (req, res) => {
  res.send('Hello!');
});

// listen for server
app.listen(3005, () => {
  console.log(`API server now on port 3005!`);
});