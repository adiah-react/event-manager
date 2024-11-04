import { doc, getDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
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
        <p className="orderName">{order.name}</p>
        <p className="orderEmail">{order.email}</p>
        <p className="orderPhone">{order.phone}</p>
        <p className="orderPayStatus">{order.paid && "Paid"}</p>
      </div>
      <button
        onClick={() => generatePDF(targetRef, { filename: "tickets.pdf" })}
      >
        Download tickets as PDF
      </button>
      <p>Tickets:</p>

      <div className="tickets" ref={targetRef}>
        {order.tickets.map((ticket) => (
          <Ticket key={ticket} id={ticket} />
        ))}
      </div>
    </main>
  );
};
export default Order;
