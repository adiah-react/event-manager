import { CssBaseline } from "@mui/material";
import React from "react";
import SignUp from "./pages/SignUp";

const App = () => {
  return (
    <React.Fragment>
      <CssBaseline enableColorScheme />
      <SignUp />
    </React.Fragment>
  );
};
export default App;
