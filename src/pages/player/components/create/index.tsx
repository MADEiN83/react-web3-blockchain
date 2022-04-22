import React, { useState } from "react";

type Props = {
  onCreatePlayer: (name: string) => void;
};

const Create: React.FC<Props> = (props) => {
  const [nameInput, setNameInput] = useState("MADEiN83");

  return (
    <>
      <input
        onChange={(e) => setNameInput(e.currentTarget.value)}
        value={nameInput}
      />
      <button onClick={() => props.onCreatePlayer(nameInput)}>
        Create player
      </button>
    </>
  );
};

export default Create;
