import "./App.css";
import NavBar from "./NavBar";
import AddUser from "./users/AddUser";
import { Route, Routes } from "react-router-dom";
import DepositMoney from "./accounts/DepositMoney";
import TransferMoney from "./accounts/TransferMoney";
import UpdateAccount from "./accounts/UpdateAccount";
import AddAccount from "./accounts/AddAccount";
import { useEffect, useState } from "react";
import axios from "axios";
import Transaction from "./accounts/Transaction";
function App() {
  const [data, setData] = useState({
    usersData: [],
    accountsData: [],
  });
  const [message, setMessage] = useState({
    status: true,
    text: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        setMessage({ status: false, text: "" });
        const usersData = await axios.get(
          "https://ashgolan-bankapi.onrender.com/api/users/"
        );
        const accountsData = await axios.get(
          "https://ashgolan-bankapi.onrender.com/api/accounts/"
        );
        setData((prev) => {
          return { usersData: usersData.data, accountsData: accountsData.data };
        });
      } catch (e) {
        setMessage({ status: true, text: "שגיאה בקליטת נתונים" });
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <NavBar></NavBar>
      {message.status && (
        <h5
          style={{
            fontSize: "1rem",
            color: "brown",
            textAlign: "center",
            backgroundColor: "yellow",
            width: "40%",
            margin: "auto",
          }}
        >
          {message.text}
        </h5>
      )}
      <Routes>
        <Route path="/" element={<addUser setMessage={setMessage}></addUser>} />
        <Route
          path="/addUser"
          element={
            <AddUser
              data={data}
              setData={setData}
              setMessage={setMessage}
            ></AddUser>
          }
        />{" "}
        <Route
          path="/DepositMoney"
          element={
            <DepositMoney
              setData={setData}
              setMessage={setMessage}
            ></DepositMoney>
          }
        />
        <Route
          path="/TransferMoney"
          element={
            <TransferMoney
              setData={setData}
              setMessage={setMessage}
            ></TransferMoney>
          }
        />
        <Route
          path="/updateAccount"
          element={
            <UpdateAccount
              data={data}
              setData={setData}
              setMessage={setMessage}
            ></UpdateAccount>
          }
        />
        <Route
          path="/AddAccount"
          element={
            <AddAccount
              data={data}
              setData={setData}
              setMessage={setMessage}
            ></AddAccount>
          }
        />
        <Route
          path="/Transaction"
          element={
            <Transaction
              data={data}
              setData={setData}
              setMessage={setMessage}
            ></Transaction>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
