import axios from "axios";
import React, { useState } from "react";
import "./DepositMoney.css";
export default function DepositMoney({ setMessage, setData }) {
  const [dipositDetails, setDipositDetails] = useState({
    idNumber: "",
    amount: "",
  });
  const deposit = async () => {
    try {
      setMessage({ status: false, text: "" });

      const data1 = await axios.get(
        `http://localhost:5000/api/accounts/deposit/${dipositDetails.idNumber}/${dipositDetails.amount}`
      );
      const data2 = await axios.get(`http://localhost:5000/api/accounts/`);
      setData((prev) => {
        return { ...prev, accountsData: data2.data };
      });
      setMessage({ status: true, text: "כסף הופקד בהצלחה" });
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
      <div className="depositMoney-container">
        <label className=" title inputUserProp" htmlFor="">
          הפקדת כסף
        </label>
        <input
          className="deposit-input"
          value={dipositDetails.idNumber}
          onChange={(e) =>
            setDipositDetails((prev) => {
              return { ...prev, idNumber: e.target.value };
            })
          }
          type="text"
          placeholder="מס החשבון"
        />
        <input
          className="deposit-input"
          value={dipositDetails.amount}
          onChange={(e) =>
            setDipositDetails((prev) => {
              return { ...prev, amount: e.target.value };
            })
          }
          type="text"
          placeholder="סכום ההפקדה"
        />
        <button className="deposit-input" onClick={deposit}>
          אישור
        </button>
      </div>
    </div>
  );
}
