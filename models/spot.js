'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const spotSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String
    },
    coordinates: [Number]
  }
});

spotSchema.index({ location: '2dsphere' });

const Spot = mongoose.model('Spot', spotSchema);

module.exports = Spot;
