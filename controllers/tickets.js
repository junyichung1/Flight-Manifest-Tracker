const FlightsInfo = require('../models/flight');
const TicketInfo = require('../models/ticket');

module.exports = {
    new: newTicket,
    create,
    delete: deleteTicket
}
function deleteTicket(req, res) {
    TicketInfo.findByIdAndDelete(req.params.id, function(err, ticket) {
        console.log(ticket)
        res.redirect(`/flights/${ticket.flight}`)
    })
}

function newTicket(req, res) {
    res.render(`tickets/new`, {title: 'Tickets', flight: req.params.id})
}
function create(req, res) {
    req.body.flight = req.params.id
    console.log(req.body)
    TicketInfo.create(req.body, function(err, ticket) {
        if (err) console.log(err)
        res.redirect(`/flights/${req.body.flight}`)
    })
}