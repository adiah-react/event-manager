import QRCode from "react-qr-code";
import "./ticket.scss";

const Ticket = (id) => {
  return (
    <div className="ticket">
      <div className="code">
        {/* <h2>TICKET</h2> */}
        {/* <p>No. {id.id}</p> */}
        <p></p>
        <QRCode bgColor="#25573e" fgColor="#c4961a" size={140} value={id.id} />
      </div>
      {/* <div className="artwork"></div> */}
    </div>
  );
};
export default Ticket;
