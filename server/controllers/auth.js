const User = require("../models/user");

exports.createOrUpdateUser = async (req, res) => {
  const { name, picture, email } = req.user;

  const user = await User.findOneAndUpdate(
    { email },
    { name: email.split("@")[0], picture },
    { new: true }
  );
  if (user) {
    console.log("USER UPDATED", user);
    res.json(user);
  } else {
    const newUser = await new User({
      email,
      name: email.split("@")[0],
      picture,
    }).save();
    console.log("USER CREATED", newUser);
    res.json(newUser);
  }
};

exports.currentUser = async (req, res) => {
  User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user);
  });
};

exports.checkDisabled = async (req, res) => {
  User.findOne({ email: req.params.email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user.disabled);
  });
  /*
  const { email } = req.body;
  User.findOne({ email: email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user.disabled);
    console.log(user.disabled)
  });*/
}

exports.list = async (req, res) => {
  try {
    res.json(await User.find({}).sort({ createdAt: -1}).exec());
  } catch (err) {
    console.log(err);
  }
}
