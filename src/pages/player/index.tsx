import React, { useCallback, useEffect, useState } from "react";

import web3 from "../../core/web3";
import json from "../../core/metadata/Player.json";

const contract = new web3.eth.Contract(
  json.abi as any,
  json.networks[5777].address
);

const Player = () => {
  const [from, setFrom] = useState("");
  const [playersCount, setPlayersCount] = useState(0);
  const [player, setPlayer] = useState<{
    name: string;
    life: { _hex: string };
    strength: { _hex: string };
  }>({} as any);

  const createPlayer = useCallback(async () => {
    await contract.methods.create("MADEiN83", 3, 10).send({
      from,
      gas: 6721975,
      gasPrice: "30000000",
    });
  }, [from]);

  const refreshCounter = useCallback(() => {
    contract.methods
      .getTotalPlayers()
      .call()
      .then((e: any) => setPlayersCount(parseInt(e._hex, 16)));
  }, []);

  const getPlayerById = useCallback((playerId: number) => {
    contract.methods.getPlayerById(playerId).call().then(setPlayer);
  }, []);

  const hit = useCallback(() => {
    const playerId = 0;
    contract.methods
      .hit(playerId)
      .send({
        from,
        gas: 6721975,
        gasPrice: "30000000",
      })
      .then((e: any) => console.log(e));

    getPlayerById(playerId);
  }, [from, getPlayerById]);

  useEffect(() => {
    web3.eth.getAccounts().then((addresses) => {
      setFrom(addresses[0]);
    });

    contract.events.PlayerCreated({ fromBlock: 0 }).on("data", (data: any) => {
      console.log("data", data);
      refreshCounter();
    });

    refreshCounter();
  }, [refreshCounter]);

  return (
    <div>
      <p>address: {from}</p>
      <p>playersCount: {playersCount}</p>
      <div>
        player:
        {player.name && (
          <ul>
            <li>name: {player.name}</li>
            <li>life: {parseInt(player.life._hex, 16)}</li>
            <li>strength: {parseInt(player.strength._hex, 16)}</li>
          </ul>
        )}
      </div>
      <button onClick={createPlayer}>Create player</button>
      <button onClick={() => getPlayerById(0)}>Get player</button>
      <button onClick={hit}>Hit</button>
    </div>
  );
};

export default Player;
