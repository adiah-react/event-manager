import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth, db } from "../../firebase.config";

import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { toast } from "react-toastify";
import Spinner from "../../components/ui/Spinner/Spinner";
import "./addOrder.scss";

const AddOrder = () => {
  const [loading, setLoading] = useState(false);
  // const [names, setNames] = { name0: "" };
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    ticketCount: 1,
    paid: false,
  });

  const { name, phone, email, ticketCount, paid } = formData;

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
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    // do a for loop across the number of tickets
    // create a ticket including:
    // * id number x
    // * an image
    //   * use the id number to generate a qr code
    //   * upload the qr code to a collection
    //   * get the reference number
    // * active/valid -> paid is true and not scanned in yet
    // * redeemed
    // * get the ref number for each ticket x

    // get a list of all the ticket refs...

    const tickets = [];

    const storeTicket = async () => {
      const ticketRef = await addDoc(collection(db, "tickets"), {
        active: true,
        redeemed: false,
        valid: true,
      });

      tickets.push(ticketRef.id);
    };

    for (let ticket = 0; ticket < ticketCount; ticket++) {
      storeTicket();
    }

    const formDataCopy = {
      ...formData,
      timestamp: serverTimestamp(),
    };
    console.log(formDataCopy);

    const docRef = await addDoc(collection(db, "orders"), formDataCopy);
    console.log(docRef);

    await updateDoc(docRef, { tickets: tickets });

    setLoading(false);
    toast.success("Order saved");
    navigate(`/orders/${docRef.id}`);
  };

  const onMutate = (e) => {
    let boolean = null;

    if (e.target.value === "true") {
      boolean = true;
    }

    if (e.target.value === "false") {
      boolean = false;
    }

    // Files
    // if (e.target.files) {
    //   setFormData((prevState) => ({
    //     ...prevState,
    //     images: e.target.files,
    //   }));
    // }

    // Text/Boolean/Numbers
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }

    if (loading) {
      return <Spinner />;
    }
  };

  // const onChange = (e) => {
  //   const namesCopy = [...names];
  //   namesCopy[e.target.name] = e.target.value;
  //   setNames(namesCopy);
  // };

  // const data = Array.from({ length: ticketCount }, (_, index) => index);

  // const nameInputs = data.map((i) => (
  //   <input
  //     key={i}
  //     type="text"
  //     // name={`name-${i}`}
  //     name={i}
  //     id={`name-${i}`}
  //     value={names[i]}
  //     onChange={onChange}
  //   />
  // ));

  return (
    <div className="order-page">
      <form className="order-form" onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={onMutate}
        />

        <label htmlFor="phone">Phone Number</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={phone}
          onChange={onMutate}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={onMutate}
        />

        <label htmlFor="number">Number of Tickets</label>
        <input
          type="number"
          name="number"
          id="ticketCount"
          value={ticketCount}
          onChange={onMutate}
          min="1"
        />

        {/* <p>Enter names on tickets</p>
        {nameInputs} */}

        <label className="formLabel">Paid</label>
        <div className="formButtons">
          <button
            className={paid ? "formButtonActive" : "formButton"}
            type="button"
            id="paid"
            value={true}
            onClick={onMutate}
          >
            Yes
          </button>
          <button
            className={
              !paid && paid !== null ? "formButtonActive" : "formButton"
            }
            type="button"
            id="paid"
            value={false}
            onClick={onMutate}
          >
            No
          </button>
        </div>
        <button type="submit">Confirm Order</button>
      </form>
    </div>
  );
};
export default AddOrder;
