var express = require("express");
var path = require("path");
var fs = require("fs");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static(__dirname));


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log(`App listening on http://localhost:${PORT}`);
});

fs.readFile("./db/db.json", "utf8", function(err, data) {
    if (err) {
        throw (err);
    }
    var notes = JSON.parse(data);

    function updateNotes() {
        fs.writeFile("./db/db.json", JSON.stringify(notes, "\t"), function(error) {
            if (error) {
                throw error;
            }
            return true;
        });
    }

    //API ROUTES
    // View notes on the sidebar
    app.get("/api/notes", function(req, res) {
        res.json(notes);
    });


    // sets up post route
    app.post("/api/notes", function(req, res) {
        let newNote = req.body;
        let id = (notes.length).toString();
        newNote.id = id
        notes.push(newNote);
        res.json(newNote);
        updateNotes();
        return console.log("Added new note: " + newNote.title);
    });

    // Deleting a note with a specific ID
    app.delete("/api/notes/:id", function(req, res) {

    });

    // Get notes based on ID
    app.get("/api/notes/:id", function(req, res) {
        res.json(notes(req.params.id));
    });


    // View the routes
    app.get("/notes", function(req, res) {
        res.sendFile(path.join(__dirname, "./public/notes.html"));
    });

    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "./public/index.html"));
    });


});