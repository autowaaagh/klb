var express = require('express'),
    router = express.Router(),
    SpecialRule = require('../schemas/SpecialRuleSchema').SpecialRule;

router.get("/", function (req, res) {
    SpecialRule.find({}, function (err, data) {
        if (err) {
            res.send("error");
            return;
        }
        res.send(data);
    });
}).get("/:id", function (req, res) {
    var id = req.params.id;
    SpecialRule.find({
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
    var model = new SpecialRule(obj);

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

    SpecialRule.findByIdAndUpdate(id, obj, function (err) {
        if (err) {
            res.send("error");
            return;
        }
        res.send("updated");
    });
}).delete("/:id", function (req, res) {
    var id = req.params.id;
    SpecialRule.findByIdAndRemove(id, function (err) {
        if (err) {
            res.send("error");
            return;
        }
        res.send("deleted");
    });
});

module.exports = router;