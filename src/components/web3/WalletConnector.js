import React, { useState } from "react";

import { useWeb3React } from "@web3-react/core";

import { InjectedConnector } from "@web3-react/injected-connector";
import Web3 from "web3";

const ConnectWallet = () => {
  const [balance, setBalance] = useState();

  const injectedConnector = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42],
  });
  const { chainId, activate, active, deactivate, account } = useWeb3React();

  const web3 = new Web3(window.ethereum);

  const connect = async () => {
    activate(injectedConnector);
  };

  console.log(balance);

  const disConnect = () => {
    deactivate(injectedConnector);
    setBalance();
  };

  const getEthBalance = async () => {
    setBalance(
      parseFloat(web3.utils.fromWei(await web3.eth.getBalance(account)))
    );

    return balance;
  };

  return (
    <div>
      <div>ChainID: {chainId}</div>
      <div>Account: {account}</div>
      <div>Balance: {balance}</div>
      {active ? (
        <div>Connection Successfull! ✅</div>
      ) : (
        <button type="button" onClick={connect}>
          Connect
        </button>
      )}
      <div>
        <button onClick={disConnect}>Disconnect</button>
      </div>
      <div>
        <button onClick={getEthBalance}>getBalance</button>
      </div>
    </div>
  );
};

export default ConnectWallet;
