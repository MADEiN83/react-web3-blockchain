import web3 from "../web3";
import json from "./definition.json";

class TestContract {
  private address = "0xD796F062E5927df0B7721AED640B93BFEA5B89cD";
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
}

export default TestContract;
