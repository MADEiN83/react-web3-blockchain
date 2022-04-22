import { Event } from "../types/event.type";
import web3 from "../web3";
import json from "../metadata/Test.json";

class TestContract {
  private instance: any;
  private fromAddress: string = "";

  constructor() {
    this.instance = new web3.eth.Contract(
      json.abi as any,
      json.networks[5777].address
    );

    web3.eth.getAccounts().then((addresses) => {
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

  listen = (eventName: string, callback: (event: Event) => void) => {
    const options = {
      fromBlock: 0,
    };

    this.instance.events?.[eventName](options)
      .on("data", callback)
      .on("changed", (changed: any) => console.log("changed", changed))
      .on("error", (err: any) => console.error("error", err))
      .on("connected", (str: any) => console.log("connected", str));
  };
}

export default TestContract;
