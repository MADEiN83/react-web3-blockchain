import React, { useCallback } from "react";

import TestContract from "../../core/test-contract";

const contract = new TestContract();

const Home: React.FC = () => {
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
    const output = await contract.setString("hey");
    console.log("setString", output);
  }, []);

  return (
    <div>
      <button onClick={set}>set</button>
      <button onClick={get}>get</button>
      <button onClick={setString}>setString</button>
      <button onClick={getString}>getString</button>
    </div>
  );
};

export default Home;
