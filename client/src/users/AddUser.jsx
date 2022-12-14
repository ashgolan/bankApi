import axios from "axios";
import React, { useState } from "react";
import "./AddUser.css";
export default function AddUser({ data, setMessage, setData }) {
  const [user, setuser] = useState({
    firstName: "",
    lastName: "",
    IdNumber: "",
    phoneNumber: "",
  });
  const addUser = async (e) => {
    e.preventDefault();
    try {
      setMessage({ status: false, text: "" });
      await axios.post("http://localhost:5000/api/users/", user);
      await axios.post(
        `http://localhost:5000/api/accounts/addAccount/${
          user.IdNumber
        }/${10000}`
      );
      const users = await axios.get(`http://localhost:5000/api/users/`);
      const accounts = await axios.get(`http://localhost:5000/api/accounts/`);

      setData((prev) => {
        return { ...prev, usersData: users.data, accountsData: accounts.data };
      });
      setuser({
        firstName: "",
        lastName: "",
        IdNumber: "",
        phoneNumber: "",
      });
      setMessage({ status: true, text: "קליינט נוסף בהצלחה עם חשבון בנק חדש" });
      setTimeout(() => {
        setMessage({ status: false, text: "" });
      }, 1500);
    } catch (e) {
      setMessage({ status: true, text: "שגיאה בקליטת נתונים" });
      setTimeout(() => {
        setMessage({ status: false, text: "" });
      }, 1500);
    }
  };
  return (
    <div className="container">
      <form onSubmit={(e) => addUser(e)} className="addUser-container">
        <label className=" title inputUserProp" htmlFor="">
          הוספת קליינט
        </label>
        <input
          className="inputUserProp"
          htmlFor=""
          placeholder="שם"
          value={user.firstName}
          onChange={(e) =>
            setuser((prev) => {
              return { ...prev, firstName: e.target.value };
            })
          }
        ></input>
        <input
          className="inputUserProp"
          htmlFor=""
          placeholder="משפחה"
          value={user.lastName}
          onChange={(e) =>
            setuser((prev) => {
              return { ...prev, lastName: e.target.value };
            })
          }
        ></input>
        <input
          className="inputUserProp"
          htmlFor=""
          placeholder="טלפון"
          value={user.phoneNumber}
          onChange={(e) =>
            setuser((prev) => {
              return { ...prev, phoneNumber: e.target.value };
            })
          }
        ></input>
        <input
          className="inputUserProp"
          htmlFor=""
          placeholder="ת.ז"
          value={user.IdNumber}
          onChange={(e) =>
            setuser((prev) => {
              return { ...prev, IdNumber: e.target.value };
            })
          }
        ></input>
        <button className="submit">אישור</button>
      </form>
    </div>
  );
}
