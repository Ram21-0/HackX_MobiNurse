import { Route, Switch, Redirect } from "react-router-dom";

import HomepageTop from "./components/HomepageTop/HomepageTop";
import HomepageBottom from "./components/HomepageBottom/HomepageBottom";
import DoctorHome from "./components/DoctorHome/DoctorHome";
import DoctorLogin from "./components/DoctorLogin/DoctorLogin";
import DoctorRegister from "./components/DoctorRegister/DoctorRegister";
import BookAppointment from "./components/BookAppointment/BookAppointment";
import ViewAppointments from "./components/ViewAppointments/ViewAppointments";

export default function App() {
  return (
    <div>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/homepage" />
        </Route>

        <Route path="/homepage">
          <HomepageTop />
          <HomepageBottom />
        </Route>

        <Route path="/doctorhome">
          <DoctorHome />
        </Route>

        <Route path="/doctorlogin">
          <DoctorLogin />
        </Route>

        <Route path="/doctorregister">
          <DoctorRegister />
        </Route>

        <Route path="/bookappointment">
          <BookAppointment />
        </Route>

        <Route path="/viewappointments">
          <ViewAppointments />
        </Route>
      </Switch>
    </div>
  );
}
