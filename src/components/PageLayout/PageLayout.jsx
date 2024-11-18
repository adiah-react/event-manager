import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Menu from "../Menu/Menu";
import Navbar from "../Navbar/Navbar";

import "./pageLayout.scss";

const PageLayout = () => {
  return (
    <div className="main">
      <Navbar />
      <div className="container">
        <div className="menuContainer">
          <Menu />
        </div>
        <div className="contentContainer">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default PageLayout;
