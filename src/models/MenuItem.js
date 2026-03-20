const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['burger', 'pizza', 'drink', 'salad'],
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: 0,
  },
  rating: {
    type: Number,
    default: 4.5,
    min: 0,
    max: 5,
  },
  reviews: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    required: [true, 'Please add an image URL'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: 500,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('MenuItem', menuItemSchema);