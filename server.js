var express = require("express");
var bodyParser = require("body-parser");
var connection = require("./config/connection.js");

var app = express();

var PORT = process.env.PORT || 3000;

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", function(req, res) {
  connection.query("SELECT * FROM burgers;", function(err, data) {
    if (err) {
      return res.status(500).end();
    }

    res.render("index", { burgers: data });
  });
});

// Create a new bruger
app.post("/burgers", function(req, res) {
  connection.query(
    "INSERT INTO burgers (burger_name) VALUES (?)",
    [req.body.burger],
    function(err, result) {
      if (err) {
        return res.status(500).end();
      }

      // Send back the ID of the new burger
      res.json({ id: result.insertId });
      console.log({ id: result.insertId });
    }
  );
});

// Delete a movie
app.delete("/burgers/:id", function(req, res) {
  connection.query(
    "DELETE FROM burgers WHERE id = ?",
    [req.params.id],
    function(err, result) {
      if (err) {
        // If an error occurred, send a generic server failure
        return res.status(500).end();
      } else if (result.affectedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();
    }
  );
});

app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});
