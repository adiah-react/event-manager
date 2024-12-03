import { doc, getDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { MdCheckCircle, MdOutlineClose } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import generatePDF from "react-to-pdf";
import Ticket from "../../components/Ticket/Ticket";
import Spinner from "../../components/ui/Spinner/Spinner";
import { db } from "../../firebase.config";
import "./order.scss";

const Order = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const params = useParams();

  const targetRef = useRef();

  useEffect(() => {
    const fetchOrder = async () => {
      const docRef = doc(db, "orders", params.orderId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setOrder(docSnap.data());
        setLoading(false);
      }
    };

    fetchOrder();
  }, [navigate, params.orderId]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <main>
      <div className="orderDetails">
        <h1>{order.name}</h1>
        <div className="item">
          <span className="itemTitle">Email:</span>
          <span className="itemValue">{order.email}</span>
        </div>
        <div className="item">
          <span className="itemTitle">Phone:</span>
          <span className="itemValue">{order.phone}</span>
        </div>
        <div className="item">
          <span className="itemTitle">Paid:</span>
          {/* <span className="itemValue">{order.paid ? "check" : "x"}</span> */}
          {order.paid ? <MdCheckCircle /> : <MdOutlineClose />}
        </div>
        {/* <p className="orderPayStatus">{order.paid && "Paid"}</p> */}
      </div>
      <button
        onClick={() => generatePDF(targetRef, { filename: "tickets.pdf" })}
      >
        Download tickets as PDF
      </button>
      <p>Tickets:</p>

      <div className="tickets" ref={targetRef}>
        {order.tickets.map((ticket) => (
          <Ticket key={ticket} ticketId={ticket} />
          // <p key={ticket}>{ticket}</p>
        ))}
      </div>
    </main>
  );
};
export default Order;
