const router = require("express").Router();

// Import the model to use its database functions.
const burger = require("../models/burger");

// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
    burger.all(function (data) {
        var hbsObject = {
            burgers: data
        };
        res.render("index", hbsObject);
    });
});

router.post("/burgers", function (req, res) {
    burger.insert(["name"], [req.body.burger_name], function (result) {
        res.json({
            id: result.insertId
        })
    })
});

router.put("/burgers/:id", function (req, res) {
    var id = "id = " + req.params.id;

    burger.update({
        devoured: req.body.devoured
    }, 
    id, function (result) {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.json(false).status(404).end();
        } else {
            res.json(true).status(200).end();
        }
    });
});

router.delete("/burgers/:id", function (req, res) {
    var id = "id = " + req.params.id;

    burger.delete(id, function (result) {
        if (result.affectedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// test getting data
router.get("/api/burgers", function (req, res) {
    burger.all(function (data) {
        var hbsObject = {
            burgers: data
        };
       res.json(hbsObject)
    });
});

// Export routes for server.js to use.
module.exports = router;