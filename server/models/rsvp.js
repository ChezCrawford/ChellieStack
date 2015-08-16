var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RsvpSchema = mongoose.Schema({
    attending: Boolean,
    guests: [{name: String}],
    shuttleInterest: String,
    createdBy: String,
    createdDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Rsvp', RsvpSchema);