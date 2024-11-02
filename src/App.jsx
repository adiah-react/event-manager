import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";

const App = () => {
  return (
    // <React.Fragment>
    //   <CssBaseline enableColorScheme />
    //   <div>App</div>
    // </React.Fragment>
    <Router>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/sign-in" element={<Login />} />
      </Routes>
    </Router>
  );
};
export default App;
