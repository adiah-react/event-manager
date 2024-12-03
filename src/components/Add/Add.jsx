import { onAuthStateChanged } from "firebase/auth";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, db } from "../../firebase.config";
import Spinner from "../ui/Spinner/Spinner";
import "./add.scss";

// const columns = [
//   { field: "id", headerName: "ID", width: 200 },
//   {
//     field: "name",
//     headerName: "Name",
//     width: 200,
//   },
//   {
//     field: "email",
//     headerName: "Email",
//     width: 250,
//   },
//   {
//     field: "phone",
//     headerName: "Phone Number",
//     width: 100,
//   },
//   {
//     field: "paid",
//     headerName: "Paid",
//     width: 90,
//     type: "boolean",
//   },
//   {
//     field: "ticketCount",
//     headerName: "Ticket Count",
//     type: "string",
//     width: 100,
//   },
// ];

const Add = ({ slug, columns, setOpen }) => {
  const [loading, setLoading] = useState(false);
  // const obj = yourArray.reduce((o, key) => ({ ...o, [key]: whatever}), {})
  const data = columns
    .filter((item) => item.field !== "id")
    .reduce((o, key) => ({ ...o, [key.field]: "" }), {});

  const [formData, setFormData] = useState(data);
  // id, name, email, phone, paid, ticketCount

  const navigate = useNavigate();
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid });
        } else {
          navigate("/sign-in");
        }
      });
    }

    return () => {
      isMounted.curent = false;
    };
    // eslint-disable-next-line
  }, [isMounted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const tickets = [];

    const storeTicket = async () => {
      const ticketRef = await addDoc(collection(db, "tickets"), {
        // active: true,
        // redeemed: false,
        // valid: true,
        status: "valid",
        event: "xOwmMpB0oZmfjUXRjMhB",
        name: "",
      });

      tickets.push(ticketRef.id);
    };

    for (let ticket = 0; ticket < formData.ticketCount; ticket++) {
      storeTicket();
    }

    const formDataCopy = {
      ...formData,
      timestamp: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, "orders"), formDataCopy);

    await updateDoc(docRef, { tickets: tickets });

    // Create a user

    setLoading(false);
    toast.success("Order saved");
    setFormData(data);
    setOpen(false);
  };

  const onMutate = (e) => {
    let boolean = null;

    if (e.target.value === "true") {
      boolean = true;
    }

    if (e.target.value === "false") {
      boolean = false;
    }

    // Text/Boolean/Numbers
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => setOpen(false)}>
          X
        </span>
        <h1>Add new {slug}</h1>
        <form onSubmit={handleSubmit}>
          {columns
            .filter((item) => item.field !== "id" && item.field !== "paid")
            .map((column) => (
              <div className="item" key={column.field}>
                <label htmlFor="">{column.headerName}</label>
                <input
                  type={column.type}
                  placeholder={column.field}
                  id={column.field}
                  onChange={onMutate}
                />
              </div>
            ))}
          <div className="item">
            <label htmlFor="names">Names</label>
            <input
              type="text"
              placeholder="Enter names separated by a comma"
              onChange={onMutate}
            />
          </div>
          <div className="item">
            <label htmlFor="">Paid</label>
            <div className="formButtons">
              <button
                className={formData.paid ? "formButtonActive" : "formButton"}
                type="button"
                id="paid"
                value={true}
                onClick={onMutate}
              >
                Yes
              </button>
              <button
                className={
                  !formData.paid && formData.paid !== null
                    ? "formButtonActive"
                    : "formButton"
                }
                type="button"
                id="paid"
                value={false}
                onClick={onMutate}
              >
                No
              </button>
            </div>
          </div>
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

Add.propTypes = {
  slug: PropTypes.string,
  columns: PropTypes.array,
  setOpen: PropTypes.func,
};

export default Add;
