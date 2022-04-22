import React, { useCallback, useEffect } from "react";

import TestContract from "../../core/test-contract";

const contract = new TestContract();

const Home: React.FC = () => {
  const get = useCallback(async () => {
    console.log("get", await contract.get());
  }, []);

  const set = useCallback(async () => {
    console.log(
      "set",
      await contract.set(
        Math.round(Math.random() * 10),
        "0xfBb4AE35b9E24a1b080462F510F812cece15839a"
      )
    );
  }, []);

  return (
    <div>
      <button onClick={set}>set</button>
      <button onClick={get}>get</button>
    </div>
  );
};

export default Home;
