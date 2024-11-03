import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageLayout from "./components/PageLayout/PageLayout";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import AddOrder from "./pages/AddOrder/AddOrder";
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
            <Route element={<PageLayout />}>
              <Route path="/home" element={<Home />} />
              <Route path="add-order" element={<AddOrder />} />
              <Route path="/dashboard" element={<h1>dashboard</h1>} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
};
export default App;
