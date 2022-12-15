import axios from "axios";
import React, { useState } from "react";
import "./UpdateAccount.css";

export default function UpdateAccount({ data, setData, setMessage }) {
  const [accountProps, setAccountProps] = useState({
    id: "",
    IdNumber: "",
    cash: "",
    credit: "",
  });
  const accounts = data.accountsData.map((clientAccount, index) => {
    return (
      <option
        className="inputUserProp"
        key={`${index}IDclient`}
        value={clientAccount.id}
      >
        {clientAccount.id}
      </option>
    );
  });

  const accounHandler = (e) => {
    e.preventDefault();
    const id = e.target.selectedOptions[0].value;
    const account = data.accountsData.find((acc) => acc.id === id);
    setAccountProps({
      id: account.id,
      IdNumber: account.owner,
      cash: account.cash,
      credit: account.credit,
    });
  };
  const updateCredit = async (e) => {
    e.preventDefault();
    try {
      setMessage({ status: false, text: "" });

      await axios.put(
        `https://ashgolan-bankapi.onrender.com/api/accounts/updateAccount/${accountProps.id}/${accountProps.credit}`
      );
      const accountData2 = await axios.put(
        `https://ashgolan-bankapi.onrender.com/api/accounts/`
      );
      setData((prev) => {
        return { ...prev, accountsData: accountData2.data };
      });
      setMessage({ status: true, text: "חשבון עודכן בהצלחה" });
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
        onSubmit={(e) => updateCredit(e)}
        action=""
        className="addUser-container"
      >
        <label className=" title inputUserProp" htmlFor="">
          עדכון מסגרת האשראי
        </label>
        <select
          onChange={(e) => accounHandler(e)}
          name=""
          id=""
          className="inputUserProp"
        >
          <option defaultValue="בחר חשבון">בחר חשבון</option>
          {accounts}
        </select>
        <input
          className="inputUserProp"
          type="text"
          disabled
          placeholder="מס חשבון"
          value={accountProps.IdNumber}
          onChange={(e) =>
            setAccountProps((prev) => {
              return { ...prev, IdNumber: e.target.value };
            })
          }
        />
        <input
          className="inputUserProp"
          type="text"
          disabled
          placeholder="יתרה"
          value={accountProps.cash}
          onChange={(e) =>
            setAccountProps((prev) => {
              return { ...prev, cash: e.target.value };
            })
          }
        />
        <input
          className="inputUserProp"
          type="text"
          placeholder="אשראי"
          value={accountProps.credit}
          onChange={(e) =>
            setAccountProps((prev) => {
              return { ...prev, credit: e.target.value };
            })
          }
        />
        <button className="inputUserProp">אישור</button>
      </form>
    </div>
  );
}
