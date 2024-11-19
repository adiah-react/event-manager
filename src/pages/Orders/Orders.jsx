import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Add from "../../components/Add/Add";
import DataTable from "../../components/DataTable/DataTable";
import Spinner from "../../components/ui/Spinner/Spinner";
import { db } from "../../firebase.config";
import "./orders.scss";

const columns = [
  { field: "id", headerName: "ID", width: 200 },
  {
    field: "name",
    headerName: "Name",
    width: 200,
  },
  {
    field: "email",
    headerName: "Email",
    width: 250,
  },
  {
    field: "phone",
    headerName: "Phone Number",
    width: 100,
  },
  {
    field: "paid",
    headerName: "Paid",
    width: 90,
    type: "boolean",
  },
  {
    field: "ticketCount",
    headerName: "Ticket Count",
    type: "string",
    width: 100,
  },
];

const Orders = () => {
  const [open, setOpen] = useState(false);

  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);

  // const params = useParams();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Get reference
        const ordersRef = collection(db, "orders");

        // Create a query
        const q = query(ordersRef, orderBy("timestamp", "desc"));

        // Execute query
        const querySnap = await getDocs(q);

        const orders = [];
        querySnap.forEach((doc) => {
          return orders.push({
            id: doc.id,
            // data: doc.data()
            ...doc.data(),
          });
        });

        setOrders(orders);
        setLoading(false);
      } catch (error) {
        toast.error("Could not fetch Order");
        console.error(error);
      }
    };

    fetchOrders();
  });

  return (
    <div className="orders">
      <div className="info">
        <h1>Orders</h1>
        <button onClick={() => setOpen(true)}>Add New Order</button>
      </div>
      {loading ? (
        <Spinner />
      ) : orders && orders.length > 0 ? (
        <DataTable slug="orders" columns={columns} rows={orders} />
      ) : (
        <p>No orders</p>
      )}

      {open && <Add slug="order" columns={columns} setOpen={setOpen} />}
    </div>
  );
};
export default Orders;
