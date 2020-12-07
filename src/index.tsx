import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createClient, Provider as UrqlProvider } from "urql";

const cli = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include",
  },
});

ReactDOM.render(
  <React.StrictMode>
    <UrqlProvider value={cli}>
      <App />
    </UrqlProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
