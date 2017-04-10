var express = require('express'),
    router = express.Router(),
    Scenario = require('../schemas/ScenarioSchema').Scenario;

router.get("/", function (req, res) {
    Scenario.find()
            .sort({diceResult: 1})
            .exec(function(err, data) {
                if (err) {
                    res.send("error");
                    return;
                }
                res.send(data);
            });
}).get("/:id", function (req, res) {
    var id = req.params.id;
    Scenario.find({
        _id: id
    }, function (err, data) {
        if (err) {
            res.send("error");
            return;
        }
        res.send(data[0]);
    });
}).post("/", function (req, res) {
    var obj = req.body;
    var model = new Scenario(obj);
     
    model.save(function (err, id) {
        if (err) {
            res.send("error");
            return;
        }
        res.send(id);
    });
}).put("/:id", function (req, res) {
    var id = req.params.id;
    var obj = req.body;

    Scenario.findByIdAndUpdate(id, obj, function (err) {
        if (err) {
            res.send("error");
            return;
        }
        res.send("updated");
    });
}).delete("/:id", function (req, res) {
    var id = req.params.id;
    Scenario.findByIdAndRemove(id, function (err) {
        if (err) {
            res.send("error");
            return;
        }
        res.send("deleted");
    });
});

module.exports = router;
