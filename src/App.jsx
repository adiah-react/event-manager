import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";

const App = () => {
  return (
    // <React.Fragment>
    //   <CssBaseline enableColorScheme />
    //   <div>App</div>
    // </React.Fragment>
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/sign-in" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};
export default App;
