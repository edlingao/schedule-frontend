import axios from "axios";
import session from "./session";

if(session) {
  axios.defaults.headers.common['auth-token'] = session
}

export default axios
