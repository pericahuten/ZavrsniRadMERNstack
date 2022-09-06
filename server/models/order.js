const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },
        count: Number,
        color: String,
        customImageURL: String,
        CustomPhoto: String,
      },
    ],
    paymentIntent: {},
    orderStatus: {
      type: String,
      default: "Nije procesirano",
      enum: [
        "Nije procesirano",
        "Plaćanje pouzećem",
        "Procesiranje",
        "Otpremljeno",
        "Otkazano",
        "Završeno",
      ],
    },
    orderdBy: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
