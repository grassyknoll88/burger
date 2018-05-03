var express = require("express");

var router = express.Router();
var burger = require("../models/burger.js");

router.get("/", function(req, res) {
  burger.all(function(allBurgers) {
    var hbsObject = {
      burger: allBurgers
    };
    res.render("index", hbsObject);
  });
});

// Create a new burger
router.post("/api/burgers", function(req, res) {
  burger.create(["burger_name"], [req.body.burger], function(newBurger) {
    res.send({ id: newBurger.insertId });
  });
});

router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  burger.update(
    {
      devoured: true
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
