var express = require('express'),
    router = express.Router(),
    ArmyList = require('../schemas/ArmyListSchema').ArmyList;

router.get("/", function (req, res) {
    ArmyList.find({}, [], {sort: {name:1}}, function (err, data) {
        if (err) {
            res.send("error");
            return;
        }
        res.send(data);
    });
}).get("/:id", function (req, res) {
    var id = req.params.id;
    ArmyList.find({
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
    var model = new ArmyList(obj);
     
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

    ArmyList.findByIdAndUpdate(id, obj, function (err) {
        if (err) {
            res.send("error");
            return;
        }
        res.send("updated");
    });
}).delete("/:id", function (req, res) {
    var id = req.params.id;
    ArmyList.findByIdAndRemove(id, function (err) {
        if (err) {
            res.send("error");
            return;
        }
        res.send("deleted");
    });
});

module.exports = router;