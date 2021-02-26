// required package/constructor/module
const express = require('express');
const fs = require('fs');
const path = require('path');

// instantiate the server, to tell it to listen for requests
const app = express();
















// listen for server
app.listen(3001, () => {
  console.log(`API server now on port 3001!`);
});