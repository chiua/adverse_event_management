const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const express = require('express');
const router = express.Router();

const dbHost = 'mongodb://database/mean-docker';

mongoose.connect(dbHost);

const eventSchema = new mongoose.Schema({
  "receiveDate": Date,
  "receiptDate": Date,
  "patient": {
      "drugs": [{
          "autorizationNumber": String,
          "DosageText": String,
          "medicinalProduct": String,
          "drugIndication": String
      }],
      "reaction": [{
          "meddraPrimaryTerm": String
      }],
      "age": String,
      "sex": Number
  },
  "safetyReportId": String,
  "companyNumber": String
});

eventSchema.plugin(mongoosePaginate);

const Event = mongoose.model('Event', eventSchema);

router.get('/', (req, res) => {
  res.send('Adverse Event Management 2');
});

router.route('/events/page/:page')
  //get all the events
  .get((req, res) => {
    //TODO: get limit passed into by the client..have the client decide how much to pull down (up to a certain limit)
    Event.paginate({}, { page: req.params.page, limit: 30 }, (err, result) => {
      if (err) res.status(500).send(error)
      res.status(200).json(result);
    });
  })
  //TODO: this has yet to be finished
  .post((req,res) => {
    let event = new Event();
    event = req.body.event;
    event.save((err) => {
      if (err) {
          res.send(err);
      }
      res.status(201).json({ message: 'event created!'});
    })

  });

router.route('/events/:event_id')
  .get((req,res) => {
    Event.findById(req.params.event_id, function(err, event){
      if (err) res.status(500).send(err);
      res.json(event);
    });
  })
  //TODO: this has yet to be finished
  .put((req,res) => {
    Event.findById(req.params.event_id, function(err, event){
      if (err) res.status(500).send(err);

      event = req.body.event;
      event.save(function(err){
        if (err)
          res.send(err);
        res.json({ message: 'event updated'});
      })
    });
  })
  .delete((req,res) => {
    Event.remove({
      _id: req.params.event_id
    }, function(err, event){
      if (err) res.status(500).send(err);
      console.log(event);
      res.json({ message: `${req.params.event_id} Successfully deleted` });
    });
  });


module.exports = router;
