import React, { Fragment, useState } from "react";

interface TesttProps {}

const Testt: React.FC<TesttProps> = ({}) => {
  return (
    <Fragment>
      <div
        style={{
          position: "absolute",
          width: "100px",
          height: "100px",
          backgroundColor: "#fff",
        }}
      >
        {/* {auth.isAuthenticated ? "user authenticated" : "unauthorized"} */}
      </div>
      {/* <button onClick={auth.toggleAuthState}>toggle auth state</button> */}
    </Fragment>
  );
};
export default Testt;
