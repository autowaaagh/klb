var express = require('express'),
    router = express.Router();

router.use('/army', require('../controllers/armylist.api'));
router.use('/artefact', require('../controllers/artefact.api'));
router.use('/specialrule', require('../controllers/speecialrules.api'));
router.use('/scenario', require('../controllers/scenario.api'));
router.use('/cypher', require('../controllers/cypher.api'));

module.exports = router;