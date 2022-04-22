import React, { useCallback, useEffect, useState } from "react";

import TestContract from "../../core/test-contract";
import Player from "../player";

const contract = new TestContract();

const Home: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("Hello World");

  const get = useCallback(async () => {
    const value = await contract.get();
    console.log("get", value);
  }, []);

  const set = useCallback(async () => {
    const output = await contract.set(Math.round(Math.random() * 10));
    console.log("set", output);
  }, []);

  const getString = useCallback(async () => {
    const value = await contract.getString();
    console.log("getString", value);
  }, []);

  const setString = useCallback(async () => {
    const output = await contract.setString(inputValue);
    console.log("setString", output);
  }, [inputValue]);

  useEffect(() => {
    contract.listen("StringHasChanged", (event) => {
      const str = `[${event.blockNumber}][StringHasChanged] ${event.returnValues.str}`;
      setLogs((prev) => [...prev, str]);
    });

    contract.listen("NumberHasChanged", (event) => {
      const str = `[${event.blockNumber}][NumberHasChanged] ${event.returnValues.number}`;
      setLogs((prev) => [...prev, str]);
    });
  }, []);

  return (
    <div>
      <Player />
      <hr />
      <button onClick={set}>set</button>
      <button onClick={get}>get</button>
      <input
        onChange={(e) => setInputValue(e.currentTarget.value)}
        value={inputValue}
      />
      <button onClick={setString}>setString</button>
      <button onClick={getString}>getString</button>

      <h3>Logs</h3>
      {logs.map((p, index) => (
        <div key={index}>{p}</div>
      ))}
    </div>
  );
};

export default Home;
