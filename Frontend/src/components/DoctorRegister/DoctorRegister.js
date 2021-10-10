import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "../../axios.js";

import dots from "./dots.png";
import docland from "./DocLand.png";
import style from "./doctorRegister.module.css";
import { Button } from "@material-ui/core";

function DoctorRegister() {
  const history = useHistory();

  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredQualification, setEnteredQualification] = useState("");

  const emailChangeHandler = (e) => {
    setEnteredEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setEnteredPassword(e.target.value);
  };

  const nameChangeHandler = (e) => {
    setEnteredName(e.target.value);
  };

  const qualificationChangeHandler = (e) => {
    setEnteredQualification(e.target.value);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const doctorData = {
      username: enteredEmail,
      pass: enteredPassword,
      name: enteredName,
      qualification: enteredQualification,
    };

    console.log(doctorData);
    // axios.get(`/`).then((res) => {
    //   console.log(res);
    // });
    axios
      .post("/signup_admin", {
        username: enteredEmail,
        pass: enteredPassword,
        name: enteredName,
        qualification: enteredQualification,
      })
      .then((res) => {
        console.log(res);
      });

    setEnteredEmail("");
    setEnteredPassword("");
    setEnteredName("");
    setEnteredQualification("");

    history.push("/doctorlogin");
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
          <h1 style={{ margin: "0 0 14px" }}>Register</h1>
          <form onSubmit={formSubmitHandler}>
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
                Password
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  onChange={passwordChangeHandler}
                  value={enteredPassword}
                />
              </label>
            </div>
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
                Qualification
                <input
                  type="text"
                  name="qualification"
                  placeholder="MBBS AIIMS"
                  onChange={qualificationChangeHandler}
                  value={enteredQualification}
                />
              </label>
            </div>

            <Button
              variant="contained"
              type="submit"
              style={{
                color: "white",
                backgroundColor: "#48CAE4",
                position: "relative",
                top: "30px",
                width: "378px",
              }}
            >
              Register
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DoctorRegister;
