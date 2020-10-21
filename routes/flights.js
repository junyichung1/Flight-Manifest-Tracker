var express = require('express');
var router = express.Router();
const flightsCtrl = require('../controllers/flights.js');
/* GET users listing. */


router.get('/', flightsCtrl.index);
router.get('/new', flightsCtrl.new);
router.post('/', flightsCtrl.create);
router.get('/:id', flightsCtrl.show);
router.delete('/:id', flightsCtrl.delete);
router.get('/:id/edit', flightsCtrl.edit);
router.put('/:id', flightsCtrl.update);

module.exports = router;
