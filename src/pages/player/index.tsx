import React, { useCallback, useEffect, useState } from "react";

import web3 from "../../core/web3";
import json from "../../core/metadata/Player.json";
import Create from "./components/create";
import Get from "./components/get";
import Hit from "./components/hit";

const contract = new web3.eth.Contract(
  json.abi as any,
  json.networks[5777].address
);

const Player = () => {
  const [from, setFrom] = useState("");
  const [playersCount, setPlayersCount] = useState(0);
  const [players, setPlayers] = useState<
    {
      name: string;
      life: { _hex: string };
      strength: { _hex: string };
    }[]
  >([]);

  const createPlayer = useCallback(
    async (name: string) => {
      await contract.methods.create(name, 3, 10).send({
        from,
        gas: 6721975,
        gasPrice: "30000000",
      });
    },
    [from]
  );

  const refreshCounter = useCallback(() => {
    contract.methods
      .getTotalPlayers()
      .call()
      .then((e: any) => setPlayersCount(parseInt(e._hex, 16)));
  }, []);

  // const getPlayerById = useCallback((playerId: number) => {
  //   contract.methods.getPlayerById(playerId).call().then(setPlayer);
  // }, []);

  const getPlayers = useCallback(() => {
    contract.methods.getPlayers().call().then(setPlayers);
  }, []);

  const hit = useCallback(() => {
    const playerId = 0; // TODO: get player id from UI.
    contract.methods
      .hit(playerId)
      .send({
        from,
        gas: 6721975,
        gasPrice: "30000000",
      })
      .then((e: any) => console.log(e));

    getPlayers();
  }, [from, getPlayers]);

  useEffect(() => {
    web3.eth.getAccounts().then((addresses) => {
      setFrom(addresses[0]);
    });

    contract.events.PlayerCreated({ fromBlock: 0 }).on("data", () => {
      refreshCounter();
      getPlayers();
    });

    refreshCounter();
  }, [refreshCounter, getPlayers]);

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <div style={{ flex: 1 }}>
        <Create onCreatePlayer={createPlayer} />
        <br />
        <br />
        <Get onGetPlayers={getPlayers} />
        <br />
        <br />
        <Hit onHit={hit} />
      </div>

      <div style={{ flex: 2 }}>
        <p>address: {from}</p>
        <p>playersCount: {playersCount}</p>

        {players.map((player, index) => (
          <div key={index}>
            Player #{index}
            <ul>
              <li>name: {player.name}</li>
              <li>life: {parseInt(player.life._hex, 16)}</li>
              <li>strength: {parseInt(player.strength._hex, 16)}</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Player;
