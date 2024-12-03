import PropTypes from "prop-types";

import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { db } from "../../firebase.config";
import Spinner from "../ui/Spinner/Spinner";
import "./ticket.scss";

const Ticket = ({ ticketId }) => {
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTicket = async () => {
      const docRef = doc(db, "tickets", ticketId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setTicket({
          id: ticketId,
          ...docSnap.data(),
        });
        setLoading(false);
      }
    };

    fetchTicket();
  }, [ticketId]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="ticket">
      <div className="code">
        {/* <h2>TICKET</h2> */}
        {/* <p>No. {id.id}</p> */}
        <p>{ticket.name}</p>
        <QRCode
          bgColor="#25573e"
          fgColor="#c4961a"
          size={140}
          value={ticket.id}
        />
      </div>
      {/* <div className="artwork"></div> */}
    </div>
  );
};
export default Ticket;

Ticket.propTypes = {
  ticketId: PropTypes.string,
};
