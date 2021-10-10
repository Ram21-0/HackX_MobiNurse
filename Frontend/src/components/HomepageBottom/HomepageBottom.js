import dots from "./dots.png";
import f1 from "./feature1.png";
import f2 from "./feature 2.png";
import f3 from "./feature3.png";
import styles from "./HomepageBottom.module.css";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";

export default function HomepageBottom() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        paddingTop: "42px",
      }}
    >
      <div className={styles.top}>
        <div
          style={{
            backgroundImage: `url(${dots})`,
            backgroundRepeat: "no-repeat",
            width: "60%",
            height: "auto",
            margin: "0px 25px",
          }}
        >
          <h1 style={{ margin: "0 0 0 90px", fontSize: "50px" }}>
            Professional Care for <span style={{ color: "#40C9E6" }}>you</span>{" "}
            &
          </h1>
          <h1 style={{ margin: "0 0 0 90px", fontSize: "50px" }}>
            <span style={{ color: "#40C9E6" }}>your loved</span> ones.
          </h1>
        </div>
      </div>

      <div className={styles.bottom}>
        <div
          style={{
            backgroundColor: "#FCFCFC",
            height: "fit-content",
            padding: "20px 0 30px 0",
            textAlign: "center",
            borderRadius: "20px",
          }}
        >
          <img src={f2} alt="f1" />
          <h2>Book Appointment</h2>
          <p style={{ marginBottom: "0" }}>Get a list of world class </p>
          <p style={{ marginTop: "0" }}>doctors around you</p>

          <Link to="/bookappointment" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              style={{ backgroundColor: "#40C9E6", color: "white" }}
            >
              Book Now
            </Button>
          </Link>
        </div>

        <div
          style={{
            backgroundColor: "#FCFCFC",
            height: "fit-content",
            padding: "20px 0 30px 0",
            textAlign: "center",
            borderRadius: "20px",
          }}
        >
          <img src={f3} alt="f1" />
          <h2>New Features</h2>
          <p style={{ marginBottom: "0" }}>Home Delivery of</p>
          <p style={{ marginTop: "0" }}>Authentic Medication</p>
          <Button
            disabled
            variant="contained"
            style={{ backgroundColor: "#EEE", color: "black" }}
          >
            Coming Soon!
          </Button>
        </div>

        <div
          style={{
            backgroundColor: "#FCFCFC",
            height: "fit-content",
            padding: "20px 0 30px 0",
            textAlign: "center",
            borderRadius: "20px",
          }}
        >
          <img src={f1} alt="f1" />
          <h2>New Features</h2>
          <p style={{ marginBottom: "0" }}>All Lab Tests from the</p>
          <p style={{ marginTop: "0" }}>comfort of your Home</p>
          <Button
            disabled
            variant="contained"
            style={{ backgroundColor: "#EEE", color: "black" }}
          >
            Coming Soon!
          </Button>
        </div>
      </div>
    </div>
  );
}
