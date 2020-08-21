const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
    airline: {type: String, enum: ['American', 'Delta', 'Southwest', 'United']},
    airport: {type: String, enum: ['ATL', 'DFW', 'DEN', 'LAX', 'SAN'], default: 'DEN'},
    flightNo: {type: Number, required: true, max: 9999, min: 10},
    // below should give you current date plus 1 year
    departs: {type: Date, default: function() {
        return new Date(new Date().setFullYear(new Date().getFullYear() + 1));
        }
    },
    passed: {type: Boolean, default: false}
});

module.exports = mongoose.model('FlightsInfo', flightSchema);