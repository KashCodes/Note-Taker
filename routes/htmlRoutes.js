// required path to pull html files
var path = require("path");

module.exports = function(app) {
  
  // gets notes.html from public dir
  app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"))
  })

  // gets index.html file from public dir
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"))
  })
}