import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, db } from "../../firebase.config";
import Spinner from "../ui/Spinner/Spinner";
import "./add.scss";

const Add = ({ slug, columns, setOpen }) => {
  const firebaseConfig = {
    apiKey: "AIzaSyDpOuG7f21z_IAc_5zvvkExmjfTjqqdFhc",
    authDomain: "events-8b504.firebaseapp.com",
    projectId: "events-8b504",
    storageBucket: "events-8b504.firebasestorage.app",
    messagingSenderId: "727472486353",
    appId: "1:727472486353:web:755ce87dbe20eb2d9d92f0",
  };

  var secondaryApp = initializeApp(firebaseConfig, "Secondary");
  const secondaryAuth = getAuth(secondaryApp);

  const [loading, setLoading] = useState(false);
  // const obj = yourArray.reduce((o, key) => ({ ...o, [key]: whatever}), {})
  const data = columns
    .filter((item) => item.field !== "id")
    .reduce((o, key) => ({ ...o, [key.field]: "" }), {});

  const [names, setNames] = useState([]);

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
      isMounted.current = false;
    };
    // eslint-disable-next-line
  }, [isMounted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const tickets = [];

    const storeTicket = async (index) => {
      const ticketRef = await addDoc(collection(db, "tickets"), {
        // active: true,
        // redeemed: false,
        // valid: true,
        status: "valid",
        event: "xOwmMpB0oZmfjUXRjMhB",
        name: names[index],
        userRef: user.uid,
      });

      tickets.push(ticketRef.id);
    };

    // for (let ticket = 0; ticket < formData.ticketCount; ticket++) {
    //   storeTicket();
    // }

    const formDataCopy = {
      ...formData,
      timestamp: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, "orders"), formDataCopy);

    // await updateDoc(docRef, { tickets: tickets });

    // Create a user

    // TODO: check to see if user exists first
    // only create a new user if they don't

    const password = docRef.id.slice(0, 8);

    const userCredential = await createUserWithEmailAndPassword(
      secondaryAuth,
      formData.email,
      password
    );

    const user = userCredential.user;

    updateProfile(user, { displayName: formData.name });

    const userInfo = {
      name: formData.name,
      email: formData.email,
      timestamp: serverTimestamp(),
    };

    await setDoc(doc(db, "users", user.uid), userInfo);

    for (let ticket = 0; ticket < formData.ticketCount; ticket++) {
      await storeTicket(ticket);
    }

    // Add the tickets to the new order
    await updateDoc(docRef, { tickets: tickets });

    secondaryAuth.signOut();

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

  const onChange = (e) => {
    const nameString = e.target.value;
    setNames(nameString.split(","));
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
              onChange={onChange}
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
