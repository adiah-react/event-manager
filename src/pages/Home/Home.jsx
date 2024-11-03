import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase.config";
const Home = () => {
  const navigate = useNavigate();
  const onLogout = () => {
    if (window.confirm("Do you really want to leave?")) {
      auth.signOut();
      navigate("/sign-in");
    }
  };
  return (
    <div>
      <h1>home</h1>
      <button onClick={onLogout}>Logout</button>
      <Link to="/add-order">Add Order</Link>
    </div>
  );
};
export default Home;
