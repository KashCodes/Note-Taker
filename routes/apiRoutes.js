// Required module connections 
const fs = require("fs")
let notes = require("../db/db.json")
const { v4: uuidv4 } = require('uuid')

module.exports = function(app) {

  // connected the JSON API
  app.get("/api/notes", (req, res) => {
    console.log(notes)
      res.json(notes)
  })

  // Looking for specific note ID to re-display after it's been saved. 
  app.get("/api/notes/:id", (req, res) => {

    const id = req.params.id
    let found
    // forEach ensures it applies to every note saved. ****
    notes.forEach(note => {
      // will only pull notes that have id's
      if (id == note.id){
        found = note
         res.json(note)
      }
    })
     res.json(false)
  })

  // after you save the note it posts notes to the list and applies id to it. 
  app.post("/api/notes", (req, res) => {
    const newNote = req.body
 
      newNote.id = uuidv4()
   
    notes.push(newNote)
    let jsonNotes = JSON.stringify(notes)
    fs.writeFile("./db/db.json", jsonNotes, function(err) {
      if (err) {
        console.log(err)
      }
      console.log("Note saved to database.")
    })
    res.json(true)
  })

}