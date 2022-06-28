import axios from "axios";
import React, { useEffect, useState } from "react";
import { Avatar, Button } from "web3uikit";
import UserInfo from "../Components/UserInfo";

import console from "console-browserify";

export default function Pending() {
  const [data, updateData] = useState([]);

  let fectchData = () => {
    axios
      .get(`https://dvote.dying.tech/requests`)
      .then((response) => {
        console.log(response.data);
        updateData(response.data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {});
  };

  useEffect(() => {
    fectchData();
  }, []);

  return (
    <div className="page pending">
      <div className="header flex center my-2">Pending Requests</div>
      <div className="requests_grid">
        {data?.map((e, i) => (
          <div className="px" key={i}>
            <UserInfo data={e} />
          </div>
        ))}
      </div>
    </div>
  );
}
