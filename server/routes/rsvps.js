var express = require('express');
var Rsvp = require('../models/rsvp');
var router = express.Router();

router.get('/', function(req, res) {
    res.json({ message: 'Welcome to the REST API.' });
});

router.route('/rsvps')

    .get(function(req, res) {
        Rsvp.find(function(err, rsvps) {
            if (err) {
                res.send(err);
            }

            res.json(rsvps);
        });
    })

    .post(function(req, res) {
        var rsvp = new Rsvp();
        rsvp.attending = req.body.attending;
        rsvp.createdBy = req.body.createdBy;
        rsvp.guests = req.body.guests;
        rsvp.shuttleInterest = req.body.shuttleInterest;

        console.log(req);
        console.log(req.body);

        rsvp.save(function(err) {
            if (err) {
                res.send(err);
            }

            res.json({message: 'Rsvp created!  Thank you for your response.'})
        });
    });

module.exports = router;