import React, { useCallback, useEffect, useState } from "react";

import web3 from "../../core/web3";
import json from "../../core/metadata/Player.json";
import Create from "./components/create";
import Get from "./components/get";
import Hit from "./components/hit";

export type PlayerType = {
  name: string;
  life: { _hex: string };
  strength: { _hex: string };
  experience: { _hex: string };
  level: { _hex: string };
};

const contract = new web3.eth.Contract(
  json.abi as any,
  json.networks[5777].address
);

const Player = () => {
  const [from, setFrom] = useState("");
  const [playersCount, setPlayersCount] = useState(0);
  const [players, setPlayers] = useState<PlayerType[]>([]);

  const createPlayer = useCallback(
    async (name: string, life: number, strength: number) => {
      await contract.methods.create(name, life, strength).send({
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
    contract.methods
      .getPlayers()
      .call()
      .then((players: any) => {
        setPlayers(players);
        setPlayersCount(players.length);
      });
  }, []);

  const hit = useCallback(
    (fromIndex: number, toIndex: number) => {
      contract.methods
        .hit(fromIndex, toIndex)
        .send({
          from,
          gas: 6721975,
          gasPrice: "30000000",
        })
        .then((e: any) => console.log(e));

      getPlayers();
    },
    [from, getPlayers]
  );

  useEffect(() => {
    web3.eth.getAccounts().then((addresses) => {
      setFrom(addresses[0]);
    });

    contract.events
      .PlayerCreated({
        fromBlock: "latest",
        toBlock: "pending",
      })
      .on("data", () => {
        refreshCounter();
        getPlayers();
      });

    contract.events
      .PlayerIsDead({
        fromBlock: "latest",
        toBlock: "pending",
      })
      .on("data", (data: any) => {
        const {
          returnValues: {
            counter: { _hex },
          },
        } = data;

        setPlayersCount(parseInt(_hex, 16));
      });

    getPlayers();
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
        <Hit onHit={hit} players={players} />
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
              <li>experience: {parseInt(player.experience._hex, 16)}</li>
              <li>level: {parseInt(player.level._hex, 16)}</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Player;
