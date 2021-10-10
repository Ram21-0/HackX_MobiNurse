import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import dots from "./dots.png";
import docland from "./DocLand.png";
import style from "./ViewAppointments.module.css";
import { Button } from "@material-ui/core";
import axios from "../../axios.js";

function ViewAppointments() {
  const doctorDetails = useSelector((state) => state);
  const [appointmentsData, setAppointmentsData] = useState([]);

  useEffect(() => {
    axios.get("/bookappointment").then((res) => {
      console.log(res.data);

      res.data.forEach((element) => {
        if (element.doctorName === doctorDetails.doctorName) {
          var today = new Date();
          var dd = String(today.getDate()).padStart(2, "0");
          var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
          var yyyy = today.getFullYear();

          today = dd + "/" + mm + "/" + yyyy;

          let allAppointments = element.appointments[today];

          // allAppointments.sort((a, b) =>
          //   a.time > b.time ? 1 : b.time > a.time ? -1 : 0
          // );

          setAppointmentsData(allAppointments);
        }
      });
    });
  }, []);

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
          <h5 style={{ margin: "0", color: "#445363" }}>
            Hello, Dr {doctorDetails.doctorName}
          </h5>
          <h1 style={{ margin: "0 0 14px" }}>Upcoming Appointments</h1>
          <h5 style={{ margin: "0", color: "#445363" }}>Today</h5>
          <div>
            {/* refer here */}
            {/* <div className={style.appointment}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h4 style={{ margin: "0" }}>Vishesh Aggarwal</h4>
                <p style={{ margin: "0" }}>12:30PM - 13:00PM</p>
              </div>
              <div
                style={{
                  margin: "auto 0",
                }}
              >
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#E1F0F3", boxShadow: "none" }}
                >
                  Join Now
                </Button>
              </div>
            </div> */}
            {/* to here */}

            {appointmentsData &&
              appointmentsData.map((appointment) => (
                <div
                  className={style.appointment}
                  key={appointment.patientEmail}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <h4 style={{ margin: "0" }}>{appointment.patientName}</h4>
                    <p style={{ margin: "0" }}>{appointment.time}</p>
                  </div>
                  <div
                    style={{
                      margin: "auto 0",
                    }}
                  >
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#E1F0F3", boxShadow: "none" }}
                    >
                      <a
                        href="http://localhost:5000/?room=x2wr2"
                        target="new"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <strong> Join Now!</strong>
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewAppointments;
