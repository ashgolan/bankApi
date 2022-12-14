import axios from "axios";
import React, { useState } from "react";

export default function TransferMoney({ setMessage, setData }) {
  const [transferingDetails, setTransferingDetails] = useState({
    client1Id: "",
    client2Id: "",
    amount: "",
  });
  const transfer = async (e) => {
    e.preventDefault();
    try {
      setMessage({ status: false, text: "" });

      await axios.get(
        `http://localhost:5000/api/accounts/transfer/${transferingDetails.client1Id}/${transferingDetails.client2Id}/${transferingDetails.amount}`
      );
      const data2 = await axios.get(`http://localhost:5000/api/accounts/`);
      setData((prev) => {
        return { ...prev, accountsData: data2.data };
      });
      setTransferingDetails({
        client1Id: "",
        client2Id: "",
        amount: "",
      });
      setMessage({ status: true, text: "כסף הועבר בהצלחה" });
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
      <form
        onSubmit={(e) => transfer(e)}
        className="addUser-container"
        action=""
      >
        <label className=" title inputUserProp" htmlFor="">
          העברת כספים
        </label>
        <input
          value={transferingDetails.client1Id}
          className="inputUserProp"
          type="text"
          placeholder="מס חשבון המעביר"
          onChange={(e) =>
            setTransferingDetails((prev) => {
              return { ...prev, client1Id: e.target.value };
            })
          }
        />
        <input
          value={transferingDetails.client2Id}
          className="inputUserProp"
          type="text"
          placeholder="מס חשבון המקבל"
          onChange={(e) =>
            setTransferingDetails((prev) => {
              return { ...prev, client2Id: e.target.value };
            })
          }
        />
        <input
          value={transferingDetails.amount}
          className="inputUserProp"
          type="text"
          placeholder="סכום ההעברה"
          onChange={(e) =>
            setTransferingDetails((prev) => {
              return { ...prev, amount: e.target.value };
            })
          }
        />
        <button className="inputUserProp">בצע העברה</button>
      </form>
    </div>
  );
}
