import QRCode from "react-qr-code";
import "./ticket.scss";

const Ticket = (id) => {
  return (
    <div className="ticket">
      <div className="code">
        <h2>TICKET</h2>
        <p>John Smith</p>
        <QRCode bgColor="#25573e" fgColor="#c4961a" size={134} value={id.id} />
      </div>
      <div className="artwork">
        <div className="graphic"></div>
        <div className="text">
          <h1 className="sr-only">Merry Grinchmas</h1>
          <p className="sr-only">
            Where Christmas perhaps means a little bit more
          </p>
          <div className="details">
            <div className="date sr-only">7th of December | 9:30 AM</div>
            <div className="address sr-only">
              At Notre Dame Campus, Marabella
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Ticket;
