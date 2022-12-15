import axios from "axios";
import React, { useState } from "react";

export default function AddAccount({ data, setMessage, setData }) {
  const [accountData, setAccountData] = useState({
    id: "",
    credit: "",
  });
  const addAccountHandler = async (e) => {
    e.preventDefault();
    try {
      setMessage({ status: false, text: "" });

      axios.post(
        `https://ashgolan-bankapi.onrender.com/api/accounts/addAccount/${accountData.id}/${accountData.credit}`
      );
      const data2 = await axios.get(
        `https://ashgolan-bankapi.onrender.com/api/accounts/`
      );
      setData((prev) => {
        return { ...prev, accountsData: data2.data };
      });
      setMessage({ status: true, text: "חשבון נוצר בהצלחה" });
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
  const ides = data.usersData.map((clientAccount, index) => {
    return (
      <option
        className="inputUserProp"
        key={`${index}IDclient`}
        value={clientAccount.IdNumber}
      >
        {clientAccount.IdNumber}
      </option>
    );
  });
  const accounHandler = (e) => {
    e.preventDefault();
    const id = e.target.selectedOptions[0].value;
    console.log(id);
    // const account = data.accountsData.find((acc) => acc.IdNumber === id);
    setAccountData({
      ...accountData,
      id: id,
    });
  };
  return (
    <div className="container">
      <form
        className="addUser-container"
        onSubmit={(e) => addAccountHandler(e)}
      >
        <label className=" title inputUserProp" htmlFor="">
          פתיחת חשבון נוסף{" "}
        </label>
        <select
          className="inputUserProp"
          onChange={(e) => accounHandler(e)}
          name=""
          id=""
        >
          <option defaultValue="בחר לפי ת.ז">בחר לפי ת.ז</option>
          {ides}
        </select>

        {/* <input
          value={accountData.id}
          onChange={(e) =>
            setAccountData((prev) => {
              return { ...prev, id: e.target.value };
            })
          }
          type="text"
          placeholder="ת.ז"
        /> */}
        <input
          className="inputUserProp"
          value={accountData.credit}
          onChange={(e) =>
            setAccountData((prev) => {
              return { ...prev, credit: e.target.value };
            })
          }
          type="text"
          placeholder="מסגרת אשראי"
        />
        <button className="inputUserProp">אישור</button>
      </form>
    </div>
  );
}
