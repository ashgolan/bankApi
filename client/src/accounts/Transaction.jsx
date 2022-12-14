import React, { useState } from "react";
import "./Transaction.css";
export default function Transaction({ data, setData, setMessage }) {
  console.log(data);
  const [selectedAccount, setSelectedAccount] = useState();
  console.log(data.accountsData);
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

  const selectHandler = (e) => {
    e.preventDefault();
    const id = e.target.selectedOptions[0].value;
    const account = data.accountsData.find((acc) => acc.id === id);
    setSelectedAccount(account);
  };
  return (
    <div className="container">
      <form className="addUser-container" action="">
        <select
          onChange={(e) => selectHandler(e)}
          className="selectTransaction"
          name=""
          id=""
        >
          <option selected defaultValue="בחר חשבון">
            בחר חשבון
          </option>
          {accounts}
        </select>
        {selectedAccount && (
          <h4
            style={{
              color: "brown",
              backgroundColor: "yellow",
              fontSize: "1.5rem",
              textAlign: "center",
              marginBottom: "1%",
            }}
          >
            {selectedAccount.cash} :יתרה
          </h4>
        )}
        <div className="transaction-container">
          {selectedAccount &&
            selectedAccount.transactions.map((tr, index) => {
              return (
                <div className="transRow" key={`transaction${index}`}>
                  <label>{tr.lastUpdate}</label>
                  <label
                    style={{
                      color:
                        tr.state > 0 || tr.state === "פתיחת חשבון"
                          ? "green"
                          : "red",
                      width: "50%",
                      textAlign: "center",
                    }}
                  >
                    {tr.state}
                  </label>
                </div>
              );
            })}
        </div>
      </form>
    </div>
  );
}
