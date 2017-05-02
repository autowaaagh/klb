var express = require('express'),
    router = express.Router(),
    Cypher = require('../schemas/CypherSchema').Cypher;

router.get("/", function(req, res) {
    Cypher.find()
        .sort({name: 1})
        .exec(function(err, data) {
            if (err) {
                res.send("error");
                return;                
            }
            res.send(data);
        });
}).get("/:id", function (req, res){
    var id = req.params.id;
    Cypher.find({
        _id: id
    }, function(err, data) {
        if (err) {
            res.send("error");
            return;                        
        }
        res.send(data[0]);
    });
}).post("/", function(req, res) {
    var obj = req.body;
    var model = new Cypher(obj);

    model.save(function(err, id) {
        if (err) {
            res.send("error");
            return;
        }
        res.send(id);
    });
}).put("/:id", function(req, res) {
    var id = req.params.id;
    var obj = req.body;

    // console.log('update start');
    Cypher.findByIdAndUpdate(id, obj, function(err) {
        if (err) {
            console.log(err);
            // res.send("error");
            return;
        }
        res.send("updated");
    });
}).delete("/:id", function(req, res) {
    var id = req.params.id;

    Cypher.findByIdAndRemove(id, function(err) {
        if (err) {
            res.send('error');
            return;
        }
        res.send("deleted");
    });
})

module.exports = router;