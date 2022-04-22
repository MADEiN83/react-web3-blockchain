import React from "react";

type Props = {
  onHit: () => void;
};

const Hit: React.FC<Props> = (props) => {
  return (
    <>
      <button onClick={props.onHit}>Hit</button>
    </>
  );
};

export default Hit;
