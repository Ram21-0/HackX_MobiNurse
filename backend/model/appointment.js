const mongoose = require("mongoose");
// const passportLocalMongoose = require('passport-local-mongoose');
const UserSchema = new mongoose.Schema(
  {
    bookingTime: { type: String, unique: true, required: true },
    patientName: { type: String, required: true },
    patientEmail: { type: String },
    doctorEmail: { type: String },
    Date: { type: String, required: true },
    Time: { type: String, required: true },
    // meetLink: {type: String, required: true},
    // subject: {type: String}
  },
  { collection: "appointment" }
);
// UserSchema.plugin(passportLocalMongoose);
const model = mongoose.model("appointment", UserSchema);

module.exports = model;
