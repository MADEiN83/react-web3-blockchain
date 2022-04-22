import web3 from "../web3";
import json from "./definition.json";

class TestContract {
  private address = "0x03F749862d8c2bBC290DaF819341e88b4359D03A";
  private instance: any;
  private fromAddress: string = "";

  constructor() {
    this.instance = new web3.eth.Contract(json.abi as any, this.address);

    web3.eth.getAccounts().then((addresses) => {
      console.log("Setting up address", addresses[0]);
      this.fromAddress = addresses[0];
    });
  }

  async get(): Promise<number> {
    return new Promise((resolve) => {
      this.instance.methods
        .get()
        .call()
        .then((e: any) => resolve(parseInt(e._hex, 16)));
    });
  }

  async set(value: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.instance.methods
        .set(value)
        .send({ from: this.fromAddress })
        .then(resolve)
        .catch(reject);
    });
  }

  async getString(): Promise<string> {
    return new Promise((resolve) => {
      this.instance.methods.getString().call().then(resolve);
    });
  }

  async setString(value: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.instance.methods
        .setString(value)
        .send({ from: this.fromAddress })
        .then(resolve)
        .catch(reject);
    });
  }
}

export default TestContract;
