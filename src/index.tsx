import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createClient, Provider } from "urql";

const cli = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include",
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider value={cli}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
