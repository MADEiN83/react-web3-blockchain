import Web3 from "web3";

// window.ethereum.enable();

const web3 = new Web3("http://127.0.0.1:7545");
// const web3 = new Web3(window.web3.currentProvider);

web3.eth.getAccounts().then((addresses) => {
  console.log("Setting up address", addresses[0]);
  web3.eth.defaultAccount = addresses[0];
});
// web3.eth.defaultAccount = account.address;

// web3.eth
//   .getBalance("0x6e35A20a740bC7288bdec5d4E138a253D4A72660")
//   .then(console.log);

export default web3;
