import React, { useMemo, useState } from "react";

import { PlayerType } from "../..";

type Props = {
  onHit: (fromIndex: number, toIndex: number) => void;
  players: PlayerType[];
};

const Hit: React.FC<Props> = (props) => {
  const { onHit, players } = props;
  const [from, setFrom] = useState(-1);
  const [to, setTo] = useState(-1);

  const options = useMemo(
    () =>
      players.map(({ name }, index) => (
        <option key={index} value={index}>
          {name}
        </option>
      )),
    [players]
  );

  return (
    <>
      <select onChange={(e) => setFrom(+e.currentTarget.value)} value={from}>
        <option value="-1" disabled>
          ---
        </option>
        {options}
      </select>
      &nbsp;
      <span>will attack</span>
      &nbsp;
      <select onChange={(e) => setTo(+e.currentTarget.value)} value={to}>
        <option value="-1" disabled>
          ---
        </option>
        {options}
      </select>
      &nbsp;
      <button onClick={() => onHit(from, to)} disabled={from < 0 || to < 0}>
        Hit
      </button>
    </>
  );
};

export default Hit;
