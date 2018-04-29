var express = require("express");
var router = express.Router();
var burger = require("../models/burger.js");

router.get("/", function(req, res) {
  burger.all(function(allBurgers) {
    console.log(allBurgers);
    res.send(allBurgers);
  });
});

// Create a new burger
router.post("/api/burgers", function(req, res) {
  burger.create(req.body.name, function(newBurger) {
    res.send({ id: newBurger.insertId });
  });
});

router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  burger.update(
    {
      devoured: req.body.devoured
    },
    condition,
    function(result) {
      if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    }
  );
});

module.exports = router;
