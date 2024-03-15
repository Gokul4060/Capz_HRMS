import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import {Toaster} from "react-hot-toast";

import "./index.css";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <App />
    <Toaster/>
    
  </Router>
);
