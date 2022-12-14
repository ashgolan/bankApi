import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

export default function NavBar() {
  const date = new Date();
  let stateOfDay = "";
  if (date.getHours() >= 0 && date.getHours() < 12) {
    stateOfDay = "בוקר טוב";
  } else if (date.getHours() >= 12 && date.getHours() < 17) {
    stateOfDay = "צהריים טובים";
  } else stateOfDay = "ערב טוב";
  return (
    <div className="nav-container">
      <label className="stateOfDay" htmlFor="">
        <Link to={"/"}> {stateOfDay}</Link>
      </label>

      <ul className="actions-container">
        <Link to="/UpdateAccount">
          <li>עדכון מסגרת אשראי</li>
        </Link>
        <Link to="/AddAccount">
          <li>פתיחת חשבון נוסף</li>
        </Link>
        <Link to="/TransferMoney">
          <li>העברת כספים</li>
        </Link>
        <Link to="/DepositMoney">
          <li>הפקדת כסף</li>
        </Link>
        <Link to="/AddUser">
          <li>הוספת קליינט</li>
        </Link>
        <Link to="/Transaction">
          <li>תנועות בחשבון</li>
        </Link>
      </ul>
    </div>
  );
}
