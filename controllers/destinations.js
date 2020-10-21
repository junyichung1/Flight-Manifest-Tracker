const FlightsInfo = require('../models/flight');

module.exports = {
    create,
    delete: deleteDestination
    // edit,
    // update
}
// function update(req, res) {
//     FlightsInfo.findByIdAndUpdate(req.params.id, function(err, flights) {
//         res.redirect()
//     })
// }
// function edit(req, res) {
//     FlightsInfo. 
//     res.render('flights/edit')
// }

function deleteDestination(req, res) {
    FlightsInfo.findById(req.params.flight, function(err, flight) {
        console.log(`AAHHHHHH`, flight)
       let idx = flight.destinations.findIndex(function(obj) {
            return (obj._id == req.params.dest)
        })
        flight.destinations.splice(idx, 1);
        flight.save(function(err) {
            res.redirect(`/flights/${flight._id}`)
        })
    })
}


function create(req, res) {
    FlightsInfo.findById(req.params.id, function(err, flight) { 
        flight.destinations.push(req.body);
        flight.save(function(err) {
            if (err) console.log(err);
            res.redirect(`/flights/${flight._id}`);
            console.log(flight)
        });
    });
}
