const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    name: { type: String },
    // email: {type: String,  unique: true, sparse: true},
    qualification: { type: String },
    password: { type: String },
    usertype: { type: String, required: true },
    // Age: {type: Number},
    // Height: {type: Number},
    // Weight: {type: Number},
    // BloodGroup: {type: String},
    // booking: [{ type: mongoose.Schema.Types.ObjectId, ref: 'appointment' }]
  },
  { collection: "users" }
);
UserSchema.plugin(passportLocalMongoose);
const model = mongoose.model("UserSchema", UserSchema);

module.exports = model;
