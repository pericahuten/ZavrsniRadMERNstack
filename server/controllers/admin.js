const Order = require("../models/order");
// const User = require("../models/user");
const admin = require("firebase-admin");
const user = require("../models/user");

exports.orders = async (req, res) => {
  let allOrders = await Order.find({})
    .sort("-createdAt")
    .populate("products.product")
    .exec();

  res.json(allOrders);
};

exports.orderStatus = async (req, res) => {
  // console.log(req.body);
  // return;
  const { orderId, orderStatus } = req.body;

  let updated = await Order.findByIdAndUpdate(
    orderId,
    { orderStatus },
    { new: true }
  ).exec();

  res.json(updated);
};

exports.disableUser = async (req, res) => {
  console.log(req.body);
  const { userId, disabled } = req.body;
  let disable = await user.findByIdAndUpdate(
    userId,
    { disabled },
    { new: true }
  ).exec();
  res.json(disable);
}
