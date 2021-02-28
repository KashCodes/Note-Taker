// Required module connections 
const fs = require("fs")
let notes = require("../db/db.json")
// applies a unique id in the form of a random string of charachters.
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
    // For a newNote to be saved it must have a completed body
    const newNote = req.body
      // Assigning each newNote an ID using UUID
      newNote.id = uuidv4()
   
    //pushes newNote to notes array.
    notes.push(newNote)
    // jsonNotes = JSON stringified notes/proper json format. 
    let jsonNotes = JSON.stringify(notes)
    // writes to db.json file, `jsonNotes` is parameter being written. 
    fs.writeFile("./db/db.json", jsonNotes, 
    // error function to catch errors and log it.
    function(err) {
      if (err) {
        console.log(err)
      }
      console.log("Note saved to database.")
    })
    res.json(true)
  })

  // function created to delete the saved notes in the JSON db. 
  app.delete("/api/notes/:id", (req, res) => {
    // to be deleted the if must have req id. 
    const id = req.params.id
    // if a not is found
    let found
    // function will use filter to delete any id that matches. Determines this by verifying it is not equal to the params set in line 57. Uses falsy statement to only delete the matched id. 
     notes =  notes.filter(note => note.id != id)
 
        // stringifying notes
        let jsonNotes = JSON.stringify(notes)
        //writing to json file, or in this case deleting from json file. 
        fs.writeFile("./db/db.json", jsonNotes,
        // error function for error log
        function(err) {
          if (err) {
            console.log(err)
          }
          console.log("The Note selected has been deleted.")
        })
    res.json(true)
  })

}