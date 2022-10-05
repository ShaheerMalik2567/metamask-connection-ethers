import React, { useState } from "react";

import { useWeb3React } from "@web3-react/core";

import { InjectedConnector } from "@web3-react/injected-connector";
import Web3 from "web3";
import value from "./EthAPI";

const ConnectWallet = () => {
  const [weibalance, setWeiBalance] = useState();
  const [ETHbalance, setETHBalance] = useState();
  const [USDTValue, setUSDTValue] = useState();

  const injectedConnector = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42],
  });
  const { chainId, activate, active, deactivate, account } = useWeb3React();

  const web3 = new Web3(window.ethereum);

  const connect = async () => {
    activate(injectedConnector);
  };

  const disConnect = () => {
    deactivate(injectedConnector);
    setWeiBalance();
    setETHBalance();
    setUSDTValue();
  };

  const getBalance = async () => {
    setWeiBalance(parseFloat(await web3.eth.getBalance(account)));

    let wei = await web3.eth.getBalance(account);
    setETHBalance(parseFloat(web3.utils.fromWei(wei, "ether")));
  };
  const getUSDTBalance = async () => {
    let USDT = await value();
    console.log(USDT);

    setUSDTValue(ETHbalance * USDT);
  };

  return (
    <div>
      <div>ChainID: {chainId}</div>
      <div>Account: {account}</div>
      <div>Wei Balance: {weibalance}</div>
      <div>Ether Balance: {ETHbalance}</div>
      <div>USDT Balance: {USDTValue}</div>
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
        <button onClick={getBalance}>Get Balance</button>
      </div>
      <div>
        <button onClick={getUSDTBalance}>Get USDT Balance</button>
      </div>
    </div>
  );
};

export default ConnectWallet;
