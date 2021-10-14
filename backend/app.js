if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
var fs = require("fs");
const app = express();
const mongoose = require("mongoose");
const User = require("./model/user.js");
const appointment = require("./model/appointment.js");
const ejs = require("ejs");
const session = require("express-session");
const passport = require("passport");
const nodemailer = require("nodemailer");
var multer = require("multer");
const PDFDOCUMENT = require("pdfkit");
const blobStream = require("blob-stream");
app.use(express.json());
app.use(cors());
app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use(
  session({ secret: "our secret key", resave: false, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(
  "mongodb+srv://temp-user:mobinurse@cluster0.vk6hu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

const db = mongoose.connection;

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

function capitalize(str) {
  const lower = str.toLowerCase();
  return str.charAt(0).toUpperCase() + lower.slice(1);
}

app.post("/login_admin", async function (req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  // console.log(req.body);
  var curr = await User.findOne({ username: req.body.username });
  console.log(curr);

  req.login(user, function (err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local", function (err, user, info) {
        if (!user) {
          return res.json({ status: "inc" });
        } else {
          //   res.redirect('/doctor_page');
          return res.send(curr);
        }
      })(req, res, function () {
        res.redirect("/doctor_page");
      });
    }
  });
});

// done
app.post("/signup_admin", async function (req, res) {
  const { username, pass, name, qualification } = req.body;
  console.log(req.body);
  User.register(
    new User({
      username: username,
      usertype: "doctor",
      qualification: qualification,
      name: name,
    }),
    pass,
    function (err, user) {
      if (err) {
        console.log(err);
        return res.json({ status: "error" });
      }
      return res.json({ status: "ok" });
    }
  );
});

// done
app.post("/bookappointment", async function (req, res) {
  const newBooking = new appointment({
    bookingTime: new Date(),
    patientName: req.body.patient,
    patientEmail: req.body.patientEmail,
    doctorEmail: req.body.doctorEmail,
    Date: req.body.date,
    Time: req.body.time,
  });
  await appointment.create(newBooking, async (err, data) => {
    if (err) {
      console.log("appointment error");
      res.status(500).send(err);
    } else {
      console.log("appointment success");

      let transport = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
          user: "mobinursehealth@gmail.com",
          pass: "laxminagar",
        },
      });

      const message = {
        from: "noreply@mobinurse.com", // Sender address
        to: req.body.patientEmail, // List of recipients
        subject: "Appointment Booked", // Subject line
        text: "Meeting Link: " + "xyz.com", // Plain text body
      };

      transport.sendMail(message, function (err, info) {
        if (err) {
          console.log(err);
        } else {
          console.log(info);
        }
      });

      return res.json({ status: "ok" });
    }
  });
});


app.get("/bookappointment", async (req, res) => {

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = dd + "/" + mm + "/" + yyyy;
  User.find({}, async function (err, data) {
    var bookingData = [];

    for (var i = 0; i < data.length; i++) {
      // console.log(data[i]);
      const obj = {
        doctorName: data[i].name,
        doctorEmail: data[i].username,
        appointments: {},
      };

      await appointment
        .find({ doctorEmail: data[i].username }, async function (err, appoint) {
          for (var j = 0; j < appoint.length; j++) {
            if (obj.appointments[appoint[j].Date] === undefined) {
              obj.appointments[appoint[j].Date] = [
                {
                  time: appoint[j].Time,
                  patientName: appoint[j].patientName,
                  patientEmail: appoint[j].patientEmail,
                },
              ];
            } else
              obj.appointments[appoint[j].Date].push({
                time: appoint[j].Time,
                patientName: appoint[j].patientName,
                patientEmail: appoint[j].patientEmail,
              });
          }
          // obj.appointments.push(appoint);
        })
        .then(bookingData.push(obj));
    }
    console.log(bookingData);
    res.send(bookingData);
  });
});

app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

app.listen(process.env.PORT || 4000, function () {
  console.log("Server started at port 4000");
});
