const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema({
  quantity: {
    type: Number,
    required: true
  },
  // create a relationship with record document
  // it is a many-to-many relationship
  // so we apply referencing
  records: [{
    ref: "Record",
    type: Schema.Types.ObjectId,
  }]
  
});

module.exports = mongoose.model("Order", OrderSchema);
