const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  orderData: {
    type: Date,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "OrderItem"
    }
  ],
  comment: {
    type: String
  },
  status: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Order", OrderSchema);
