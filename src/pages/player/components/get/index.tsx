import React from "react";

type Props = {
  onGetPlayers: () => void;
};

const Get: React.FC<Props> = (props) => {
  return <button onClick={props.onGetPlayers}>Get players</button>;
};

export default Get;
