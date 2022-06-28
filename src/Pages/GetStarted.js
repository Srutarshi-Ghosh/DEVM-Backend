import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, useNotification } from "web3uikit";
import { verifier } from "../Recoil/verifier";
import logo from "../Assets/logo.webp";

import { useRecoilState } from "recoil";

export default function GetStarted() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [verifierData, setVerifierData] = useRecoilState(verifier);

  const dispatch = useNotification();

  const handleNewNotification = (type, title, message) => {
    dispatch({
      type,
      message,
      title,
      position: "topR",
    });
  };

  return (
    <div className="get_started page">
      <img src={logo} alt="logo" className="logo" />
      <div className="get_started_text header">Election Verification</div>
      <Input
        type="text"
        placeholder="Enter Name here"
        value={verifierData}
        onChange={(e) => {
          setVerifierData(e.target.value);
        }}
      />
      <div to="/login" className="btn_container my-2">
        <Button
          radius={8}
          size="large"
          isFullWidth
          onClick={() => {
            if (verifierData) {
              setLoading(true);
              navigate("/pending");
            } else {
              handleNewNotification("error", "Error", "Empty input!");
            }
          }}
          isLoading={loading}
          loadingText={"Loading"}
          id="get_started_btn"
          text="Click Here To Verify"
          theme="primary"
        />
      </div>
    </div>
  );
}
