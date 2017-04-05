var express = require('express'),
    router = express.Router();

router.use('/army', require('../controllers/armylist.api'));
router.use('/artefact', require('../controllers/artefact.api'));
router.use('/specialrule', require('../controllers/speecialrules.api'));

module.exports = router;