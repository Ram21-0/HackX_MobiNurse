import axios from "axios";

const instance = axios.create({
  baseURL: "https://mighty-citadel-97840.herokuapp.com/",
});

export default instance;
