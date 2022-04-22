import web3 from "../web3";

class TestContract {
  private address = "0xAA8D78ff95Eb4462446629e99D99E42321F077D3";
  private abi: any = [
    {
      inputs: [],
      name: "get",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "set",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  private instance: any;

  constructor() {
    this.instance = new web3.eth.Contract(this.abi, this.address);
  }

  async get(): Promise<number> {
    return new Promise((resolve) => {
      this.instance.methods
        .get()
        .call()
        .then((e: any) => resolve(parseInt(e._hex, 16)));
    });
  }

  async set(value: number, from: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.instance.methods
        .set(value)
        .send({ from })
        .then(resolve)
        .catch(reject);
    });
  }
}

export default TestContract;
