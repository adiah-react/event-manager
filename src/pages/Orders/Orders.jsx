import DataTable from "../../components/DataTable/DataTable";
import "./orders.scss";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Name",
    width: 100,
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },
  {
    field: "phone",
    headerName: "Phone Number",
    width: 200,
  },
  {
    field: "paid",
    headerName: "Paid",
    width: 150,
    type: "boolean",
  },
  {
    field: "ticketCount",
    headerName: "Ticket Count",
    type: "string",
    width: 100,
  },
];

const orders = [
  {
    id: 1,
    email: "nathanieljadiah@gmail.com",
    name: "Nathaniel Adiah",
    phone: "8684723716",
    paid: false,
    ticketCount: 1,
  },
];

const Orders = () => {
  return (
    <div className="orders">
      <div className="info">
        <h1>Orders</h1>
        <button>Add New Order</button>
      </div>
      <DataTable slug="orders" columns={columns} rows={orders} />
    </div>
  );
};
export default Orders;
