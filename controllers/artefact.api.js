var express = require('express'),
    router = express.Router(),
    Artefact = require('../schemas/ArtefactSchema').Artefact;

router.get("/", function (req, res) {
    Artefact.find()
        .sort({pts: 1})
        .sort({name: 1})
        .exec(function (err, data) {
                if (err) {
                    res.send("error");
                    return;
                }
                res.send(data);
        });
}).get("/:id", function (req, res) {
    var id = req.params.id;
    Artefact.find({
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
    var model = new Artefact(obj);

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

    Artefact.findByIdAndUpdate(id, obj, function (err) {
        if (err) {
            res.send("error");
            return;
        }
        res.send("updated");
    });
}).delete("/:id", function (req, res) {
    var id = req.params.id;
    Artefact.findByIdAndRemove(id, function (err) {
        if (err) {
            res.send("error");
            return;
        }
        res.send("deleted");
    })
})

module.exports = router;