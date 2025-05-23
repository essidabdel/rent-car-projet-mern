const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  description: { type: String },
  price:       { type: Number, required: true },
  category:    { type: String, required: true },
  photo: { type: String },
  owner:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Product', productSchema);
