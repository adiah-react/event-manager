import { Scanner } from "@yudiel/react-qr-scanner";
import { useState } from "react";

const Scan = () => {
  const [mode, setMode] = useState("default");
  const [ticketId, setTicketId] = useState(null);

  // Have a screen with a button to start the scan
  // - change the mode to scan x
  // - onScan -> update state to include the ticket id
  // - update the ticket info to say redeemed
  // - then display the ticket order ticket info
  //   including order details on a separate page

  const onScan = (result) => {
    setTicketId(result.rawValue);
  };

  if (mode == "scan") {
    return (
      <div className="scanner">
        <button onClick={() => setMode("default")}>Cancel</button>
        <Scanner onScan={(result) => onScan(result)} />
      </div>
    );
  }

  return (
    <div className="scan">
      <button onClick={() => setMode("scan")}>Scan a ticket</button>
    </div>
  );
};
export default Scan;
