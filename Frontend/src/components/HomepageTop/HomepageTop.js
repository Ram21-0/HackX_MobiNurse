import React from "react";
import { Link } from "react-router-dom";

import patient from "./patient2.jpeg";
import dots from "./dots.png";
import style from "./HomepageTop.module.css";
import { Button } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

function HomepageTop() {
  //   let backgroundImage = "url('patient.jpeg'" + ");";
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${patient})`,
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
            width: "60%",
            height: "auto",
            margin: "0px 25px",
          }}
        >
          <h1 style={{ margin: "5px 0px 0px", color: "black" }}>Mobinurse</h1>
          <h3 style={{ margin: "0", color: "#747576" }}>
            The modern healthcare solution to all your needs.
          </h3>

          <Link to="/doctorhome" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              style={{
                color: "white",
                backgroundColor: "#48CAE4",
                position: "relative",
                top: "30px",
                textDecoration: "none",
              }}
            >
              Register as a Doctor
            </Button>
          </Link>
        </div>
        <div className={style.left_desc}>
          <div
            style={{
              transformOrigin: "top left",
              transform: "rotate(-90deg) translateX(-100%)",
              fontSize: "30px",
              color: "#CAC8C9",
              flex: "0.3",
            }}
          >
            <h1 style={{ margin: "0px" }}>AI & ML</h1>
            <h1 style={{ margin: "0px" }}>POWERED</h1>
          </div>
          <div
            style={{
              marginTop: "100px",
              flex: "0.7",
              transform: "translateX(-20%)",
            }}
          >
            <h1 style={{ margin: "0px" }}>We take care of</h1>
            <h1 style={{ margin: "0px" }}>your health.</h1>
            <p style={{ margin: "0px", color: "#4AC9E3" }}>
              <strong>And no messy prescriptions any more :P</strong>
            </p>
            <p style={{ margin: "7px 0px" }}>
              We use AI to auto generate accurate prescriptions and we’ve
              created a world class platform for you to interact with your
              doctor from the convenience of your home.
            </p>

            <Link to="/bookappointment" style={{ textDecoration: "none" }}>
              <Button
                style={{
                  backgroundColor: "transparent",
                  color: "#4AC9E3",
                  margin: "21px 0px",
                  textDecoration: "none",
                }}
              >
                Book Now
                <ArrowForwardIcon />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomepageTop;
