var express = require('express'),
    router = express.Router(),
    db_importer = require('../db-importer');

router.get('/', function (req, res, next) {
    db_importer.readFiles();
});

module.exports = router;