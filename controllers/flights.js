const FlightsInfo = require('../models/flight');
const TicketInfo = require('../models/ticket');

module.exports = {
    new: newFlights,
    index,
    create,
    show,
    delete: deleteFlight,
    edit,
    update
}
function update(req, res) {
    req.body.status = !!req.body.status
    FlightsInfo.findByIdAndUpdate(req.params.id, req.body, function(err, flight) {
        res.redirect('/flights')
    })
}
function edit(req, res) {
    FlightsInfo.findById(req.params.id, function(err, flight) {
        res.render('flights/edit', {title: 'Edit Flight', flight, departsDate: flight.departs.toISOString().slice(0, 16)})
    })
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
    req.body.status = !!req.body.status
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
    FlightsInfo.find({}, function(err, flight) {

        const newFlight = new FlightsInfo();
        const dt = newFlight.departs;
        const departsDate = dt.toISOString().slice(0, 16);
        res.render('flights/new', {title: 'Enter New Flight', departsDate, flight})
    })
    
}