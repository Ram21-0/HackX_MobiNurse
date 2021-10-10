import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "../../axios.js";

import dots from "./dots.png";
import docland from "./DocLand.png";
import style from "./doctorLogin.module.css";
import { Button } from "@material-ui/core";

function DoctorLogin() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const emailChangeHandler = (e) => {
    setEnteredEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setEnteredPassword(e.target.value);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const doctorLoginData = {
      email: enteredEmail,
      password: enteredPassword,
    };

    console.log(doctorLoginData);

    axios
      .post("/login_admin", {
        username: enteredEmail,
        password: enteredPassword,
      })
      .then((res) => {
        console.log(res.data);

        if (res.data.status === "inc") {
          alert("Incorrect Username/Password");
          history.push("/doctorlogin");
        } else {
          dispatch({ type: "doctorInfo", doc: res.data });
          history.push("/viewappointments");
        }
      });

    setEnteredEmail("");
    setEnteredPassword("");
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
          <h1 style={{ margin: "0 0 14px" }}>Login</h1>
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
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DoctorLogin;
