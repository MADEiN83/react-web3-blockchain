export type Event = {
  address: string;
  blockHash: string;
  blockNumber: number;
  event: string;
  id: string;
  logIndex: number;
  raw: { data: string; topics: [] };
  returnValues: Record<string | number, any>;
  signature: string;
  transactionHash: string;
  transactionIndex: number;
  type: string;
};
