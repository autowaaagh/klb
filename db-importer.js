var fs = require('fs');

ArmyList = require('./schemas/ArmyListSchema').ArmyList;
Artefact = require('./schemas/ArtefactSchema').Artefact;
SpecialRule = require('./schemas/SpecialRuleSchema').SpecialRule;

module.exports = {
    readFiles: function () {
        var isEnabled = true;

        if (isEnabled) {
            fs.readdir(__dirname + '/client/data', function (err, files) {
                files.forEach(function (file, i) {
                    var fullname = __dirname + '/client/data/' + file;
                    if (file === 'artefacts.json') {
                        fs.readFile(fullname, function (err, data) {
                            if (err) {
                                console.log(err);
                                return;
                            }

                            var obj = JSON.parse(data);
                            obj.forEach(function (o, i) {
                                var model = new Artefact();
                                model.name = o.name;
                                model.pts = o.pts;
                                model.validTypes = o.validTypes;
                                model.description = o.description;
                                console.log(model);
                                model.save(function (errO) {
                                    if (err) {
                                        res.send('err');
                                        return;
                                    }
                                });
                            });
                        });
                    } else if (file === 'special-rules.json') {
                        fs.readFile(fullname, function (err, data) {
                            if (err) {
                                console.log(err);
                                return;
                            }

                            var obj = JSON.parse(data);
                            obj.forEach(function (o, i) {
                                var model = new SpecialRule();
                                model.name = o.name;
                                model.desc = o.desc;
                                console.log(model);
                                model.save(function (errO) {
                                    if (err) {
                                        res.send('err');
                                        return;
                                    }
                                });
                            });
                        });
                    } else if (file === 'armies.json') {

                    } else {
                        fs.readFile(fullname, function (err, data) {
                            if (err) {
                                console.log(err);
                                return;
                            }
                            var obj = JSON.parse(data);
                            var model = new ArmyList(obj);
                            model.save(function (err) {
                                if (err) {
                                    res.send('err');
                                    return;
                                }

                                fs.unlink(fullname);
                                console.log('created');
                            });


                        });
                    }
                });
            });
        }
    }
}