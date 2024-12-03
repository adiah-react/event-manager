import { auth } from "../../firebase.config";
import "./navbar.scss";

const Navbar = () => {
  const user = auth.currentUser;
  return (
    <div className="navbar">
      <div className="logo">
        <img src="/oxbridge_logo.png" alt="" />
        <span>OxisEvents</span>
      </div>
      <div className="icons">
        <img src="/search.svg" alt="" className="icon" />
        <img src="/app.svg" alt="" className="icon" />
        <img src="/expand.svg" alt="" className="icon" />
        <div className="notification">
          <img src="/notifications.svg" alt="" />
          <span>1</span>
        </div>
        <div className="user">
          <img src="/pro_pic.jpg" alt="" />
          <span>{user.displayName}</span>
        </div>
        <img src="/settings.svg" alt="" className="icon" />
      </div>
    </div>
  );
};
export default Navbar;
