import React from "react";
import { Link } from "react-router-dom";

import dots from "./dots.png";
import docland from "./DocLand.png";
import style from "./doctorHome.module.css";
import { Button } from "@material-ui/core";

function DoctorHome() {
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
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Link to="/doctorregister" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                style={{
                  color: "white",
                  backgroundColor: "#48CAE4",
                  position: "relative",
                  top: "30px",
                  width: "125px",
                }}
              >
                Register
              </Button>
            </Link>

            <Link to="/doctorlogin" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                style={{
                  color: "black",
                  backgroundColor: "#E8E8E8",
                  position: "relative",
                  top: "30px",
                  marginLeft: "21px",
                  width: "125px",
                }}
              >
                Login
              </Button>
            </Link>
          </div>
        </div>
        <div className={style.left_desc}>
          <h1 style={{ margin: "0" }}>Why use Mobinurse?</h1>

          <h2 style={{ margin: "0", color: "#48CAE4" }}>
            <em>AI Powered prescription Generation</em>
          </h2>
          <ul>
            <li>
              <p style={{ margin: "14px 0 0", fontSize: "20px" }}>
                <em>Access to our world class AI & ML Powered Platform</em>
              </p>
            </li>
            <li>
              <p style={{ margin: "14px 0 0", fontSize: "20px" }}>
                <em>Schedule apointments in the platform itself</em>
              </p>
            </li>
            <li>
              <p style={{ margin: "14px 0 0", fontSize: "20px" }}>
                <em>
                  Use the Video-Call feature to interact with the platform
                </em>
              </p>
            </li>
            <li>
              <p
                style={{
                  margin: "14px 0 0",
                  color: "#48CAE4",
                  fontSize: "20px",
                }}
              >
                <strong>
                  <em>No messy prescriptions anymore</em>
                </strong>
              </p>
              <p style={{ margin: "0", fontSize: "20px" }}>
                We use AI to automatically generate prescriptions using data
                from the patient-doctor conversation.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DoctorHome;
