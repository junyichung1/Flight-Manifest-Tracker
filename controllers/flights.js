const FlightsInfo = require('../models/flight');
const TicketInfo = require('../models/ticket');

module.exports = {
    new: newFlights,
    index,
    create,
    show,
    delete: deleteFlight
}

function deleteFlight(req, res) {
    FlightsInfo.findByIdAndDelete(req.params.id, function(err, flight) {
        console.log(flight)
        res.redirect('/flights')
    })
    // console.log(req.params.id);
}

function show(req, res) {
    FlightsInfo.findById(req.params.id, function(err, flight) {
        TicketInfo.find({flight: flight._id}, function(err, ticket) {
            const newFlight = new FlightsInfo();
            const dt = newFlight.departs;
            const departsDate = dt.toISOString().slice(0, 16);
            res.render('flights/show', {title: "Flight Details", flight, departsDate, ticket})
        })
    });
}
// need to check if flightNo is a string and make sure to delete it
function create(req, res) {
    for (let key in req.body) {
        if (req.body[key].length < 2 ) delete req.body[key]; 
    }
    const addedFlight = new FlightsInfo(req.body);
    addedFlight.save(function(err) {
        //   if not null, then render to new.ejs
          if (err) {
              return res.redirect('/flights/new');
          }
        //   console.log(addedFlight)
    res.redirect('/flights');
    });
}

function index(req, res) {
    FlightsInfo.find({}, function(err, flightDocs) {
        res.render('flights/index', {title: 'Flight Manifest', flightDocs})
    })
}

function newFlights(req, res) {
    const newFlight = new FlightsInfo();
    const dt = newFlight.departs;
    const departsDate = dt.toISOString().slice(0, 16);
    res.render('flights/new', {title: 'Enter New Flight', departsDate})
    
}