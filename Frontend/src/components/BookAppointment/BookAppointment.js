import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import dots from "./dots.png";
import docland from "./DocLand.png";
import style from "./BookAppointment.module.css";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import axios from "../../axios.js";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    marginTop: 0,
  },
  selectEmpty: {},
}));

function BookAppointment() {
  const classes = useStyles();
  const history = useHistory();
  const initialTimings = {
    "11:00 - 11:30": false,
    "11:30 - 12:00": false,
    "12:00 - 12:30": false,
    "12:30 - 13:00": false,
    "13:00 - 13:30": false,
    "13:30 - 14:00": false,
    "14:00 - 14:30": false,
    "14:30 - 15:00": false,
    "15:00 - 15:30": false,
    "15:30 - 16:00": false,
    "16:00 - 16:30": false,
    "16:30 - 17:00": false,
  };

  // appoints data
  const [appointmentsData, setAppointmentsData] = useState([]);

  useEffect(() => {
    axios.get("/bookappointment").then((res) => {
      console.log(res.data);
      setAppointmentsData(res.data);
    });
  }, []);

  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const [enteredDoctor, setEnteredDoctor] = useState("");
  const [enteredTime, setEnteredTime] = useState("");
  const [timings, setTimings] = useState(JSON.stringify(initialTimings));

  const nameChangeHandler = (e) => {
    setEnteredName(e.target.value);
  };

  const emailChangeHandler = (e) => {
    setEnteredEmail(e.target.value);
  };

  const dateChangeHandler = (e) => {
    var today = new Date(e.target.value);
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + "/" + mm + "/" + yyyy;
    setEnteredDate(today);
  };

  const doctorChangeHandler = (e) => {
    //console.log(e.target.value);
    setEnteredDoctor(e.target.value);

    // sample appointmentsData
    // [
    //   {
    //       "doctorName": "sample",
    //       "doctorEmail": "sample2@gmail.com",
    //       "appointments": {
    //           "09/10/2021": [
    //               {
    //                   "time": "13:30 - 14:00",
    //                   "patientName": "sriram",
    //                   "patientEmail": "sample@gmail.com"
    //               },
    //               {
    //                   "time": "12:30 - 13:00",
    //                   "patientName": "sriram",
    //                   "patientEmail": "vishesh1999gupta@gmail.com"
    //               }
    //           ]
    //       }
    //   }
    // ]

    console.log(enteredDate);
    appointmentsData.forEach((doctor) => {
      if (
        doctor.doctorEmail === e.target.value &&
        doctor.appointments[enteredDate]
      ) {
        doctor.appointments[enteredDate].forEach((t) => {
          console.log("inside if");
          let copyTimings = {
            ...JSON.parse(timings),
          };

          copyTimings[t.time] = true;
          console.log(t.time);

          setTimings(JSON.stringify(copyTimings));
        });
      }
    });

    console.log(timings);
  };

  const timeChangeHandler = (e) => {
    setEnteredTime(e.target.value);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const appointmentData = {
      name: enteredName,
      email: enteredEmail,
      date: enteredDate,
      doctor: enteredDoctor,
      time: enteredTime,
    };

    console.log(appointmentData);

    axios
      .post("/bookappointment", {
        patient: enteredName,
        patientEmail: enteredEmail,
        date: enteredDate,
        doctorEmail: enteredDoctor,
        time: enteredTime,
      })
      .then((res) => {
        console.log(res.data);
      });

    setEnteredName("");
    setEnteredEmail("");
    setEnteredDate("");
    setEnteredDoctor("");
    setEnteredTime("");

    history.push("/homepage");

    //history.push("/viewappointments");
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${docland})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div className={style.left}>
        <div
          className={style.left_tag}
          style={{
            backgroundImage: `url(${dots})`,
            backgroundRepeat: "no-repeat",
            width: "50%",
            height: "auto",
            margin: "0px 25px",
          }}
        >
          <h1 style={{ margin: "5px 0px 0px", color: "black" }}>Mobinurse</h1>
          <h3 style={{ margin: "0", color: "#747576" }}>
            The modern healthcare solution to all your needs.
          </h3>
        </div>
        <div className={style.left_desc}>
          <h1 style={{ margin: "0 0 7px" }}>Book an Appointment</h1>
          <form onSubmit={formSubmitHandler}>
            <div className={style.batch}>
              <label>
                Name
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  onChange={nameChangeHandler}
                  value={enteredName}
                />
              </label>
            </div>

            <div className={style.batch}>
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="sample@domain.com"
                  onChange={emailChangeHandler}
                  value={enteredEmail}
                />
              </label>
            </div>

            <div className={style.batch}>
              <label>
                Date
                <input
                  type="date"
                  name="date"
                  onChange={dateChangeHandler}
                  //value={enteredDate}
                />
              </label>
            </div>

            <div className={style.batch}>
              <FormControl className={classes.formControl}>
                <label>Doctor Name</label>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  style={{
                    width: "373px",
                    paddingLeft: "10px !important",
                    marginTop: "0",
                  }}
                  onChange={doctorChangeHandler}
                  value={enteredDoctor}
                >
                  {appointmentsData.map((doctor) => (
                    <MenuItem
                      key={doctor.doctorEmail}
                      value={doctor.doctorEmail}
                    >
                      {doctor.doctorName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className={style.batch}>
              <FormControl className={classes.formControl}>
                <label>Time</label>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  style={{
                    width: "373px",
                    paddingLeft: "10px !important",
                    marginTop: "0",
                  }}
                  onChange={timeChangeHandler}
                  value={enteredTime}
                >
                  {Object.keys(JSON.parse(timings)).map(
                    (t) =>
                      !JSON.parse(timings)[t] && (
                        <MenuItem key={t} value={t}>
                          {t}
                        </MenuItem>
                      )
                  )}
                </Select>
              </FormControl>
            </div>

            <Button
              variant="contained"
              type="submit"
              style={{
                color: "white",
                backgroundColor: "#48CAE4",
                width: "378px",
                marginTop: "7px",
              }}
            >
              Book
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookAppointment;
