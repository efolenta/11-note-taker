var express = require("express");
var path = require("path");
var fs = require("fs");

var app = express();
var PORT = process.env.PORT ||3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log(`App listening on http://localhost:${PORT}`);
  });