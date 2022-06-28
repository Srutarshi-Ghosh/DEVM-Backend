import React, { useState } from "react";
import { Avatar, Button, useNotification } from "web3uikit";

import { ethers } from "ethers";
import { votingContract } from "./../Contract/votingContract";

import console from "console-browserify";

import MD5 from "crypto-js/md5";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { verifier } from "../Recoil/verifier";

export default function UserInfo({ data }) {
  const [loading, setLoading] = useState(false);
  const verifierName = useRecoilValue(verifier);
  const dispatch = useNotification();

  const handleNewNotification = (type, title, message) => {
    dispatch({
      type,
      message,
      title,
      position: "topR",
    });
  };

  async function verifyVoter() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const address = await provider.send("eth_requestAccounts", []);
    let networks = await provider.getNetwork();
    const signer = provider.getSigner();

    const votingContractSign = votingContract.connect(signer);

    try {
      if (!data.wallet) {
        return handleNewNotification(
          "error",
          "Error",
          "User has not properly linked wallet."
        );
      }

      let hashed = MD5(data.id).toString();

      console.log(hashed);

      let tx = await votingContractSign.verifyVoter(
        hashed,
        data.wallet,
        verifierName
      );

      console.log(tx);
      window.open(`https://goerli.etherscan.io/tx/${tx.hash}`);

      await axios.get("https://dvote.dying.tech/request-approve/" + data.id);
      window.location.reload();
    } catch (e) {
      console.log(e);
      handleNewNotification("warning", "Error", e.message);
    }
  }

  return (
    <div>
      <div className="candidate_details">
        <div className="flex center">
          <Avatar size={40} theme="image" image={data?.picture} isRounded />
        </div>

        <div className="space"></div>

        <div className="row">
          <div className="query">Name:</div>
          <div className="value">{data?.fullName}</div>
        </div>

        <div className="space"></div>

        <div className="row">
          <div className="query">Father Name:</div>
          <div className="value">{data?.fatherName}</div>
        </div>

        <div className="space"></div>

        <div className="row">
          <div className="query">DOB:</div>
          <div className="value">{data?.dob}</div>
        </div>

        <div className="space"></div>

        <div className="row">
          <div className="query">Address: </div>
          <div className="value">{data?.fullAddress}</div>
        </div>

        <div className="space"></div>

        <div className="row">
          <div className="query">Aadhar Number:</div>
          <div className="value">1234 5678 9012</div>
        </div>

        <div className="space"></div>

        <div className="row">
          <div className="query">Voter ID:</div>
          <div className="value">{data?.id}</div>
        </div>

        <div className="space"></div>

        <Button
          radius={8}
          size="large"
          isFullWidth
          id="get_started_btn"
          text="Approve"
          loadingText="Approving"
          theme="primary"
          isLoading={loading}
          onClick={() => {
            setLoading(true);
            verifyVoter();
          }}
        />
      </div>
    </div>
  );
}
