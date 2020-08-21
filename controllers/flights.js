const FlightsInfo = require('../models/flight');

module.exports = {
    new: newFlights,
    index,
    create
    
}
function create(req, res) {
    for (let key in req.body) {
        if (req.body[key].length < 2) delete req.body[key]; 
    }
    const addedFlight = new FlightsInfo(req.body);
    addedFlight.save(function(err) {
        //   if not null, then render to new.ejs
          if (err) return res.render('flights/new');
          console.log(addedFlight)
    res.redirect('/flights');
    })
}

function index(req, res) {
    FlightsInfo.find({}, function(err, flightDocs) {
        res.render('flights/index', {flightDocs})
    })
}

function newFlights(req, res) {
    res.render('flights/new')
    
}