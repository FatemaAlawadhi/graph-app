import * as fetch from "./FetchData.jsx";
import { useEffect } from "react";
import React, { useState } from "react";
import { Loading } from "./Loading.jsx";

export function UserXP(props) {
  const [Level, setUserLevel] = useState(null);
  const [XP, setXP] = useState(null);

  useEffect(() => {
    async function fetchAndSetUserData() {
      try {
        const level = await fetch.fetchLevel(props.UserData.login);
        const XPAmount = await fetch.fetchXP(props.UserData)
        setUserLevel(level);
        setXP(XPAmount)
      } catch (error) {
        console.log(error);
      }
    }
    fetchAndSetUserData();
  }, []);

  if (!Level || !XP) {
    return (
      Loading()
    );
  }

  return (
    <div className="UserData XP">
      <div className="Amount-container">
        <p>Level</p>
        <div className="Level-Container">
          <p>{Level}</p>
        </div>
      </div>
      <div className="Amount-container">
        <p>Total XP</p>
        <div className="XP-Container">
          <p>{XP}</p>
        </div>
      </div>
    </div>
  );
}

