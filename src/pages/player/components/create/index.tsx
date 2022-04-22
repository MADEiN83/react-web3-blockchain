import React, { useState } from "react";

type Props = {
  onCreatePlayer: (name: string, life: number, strength: number) => void;
};

const Create: React.FC<Props> = (props) => {
  const [nameInput, setNameInput] = useState("MADEiN83");
  const [lifeInput, setLifeInput] = useState(100);
  const [strengthInput, setStrengthInput] = useState(10);

  return (
    <>
      <input
        onChange={(e) => setNameInput(e.currentTarget.value)}
        value={nameInput}
      />
      <input
        onChange={(e) => setLifeInput(+e.currentTarget.value)}
        value={lifeInput}
        type="number"
      />
      <input
        onChange={(e) => setStrengthInput(+e.currentTarget.value)}
        value={strengthInput}
        type="number"
      />
      <button
        onClick={() =>
          props.onCreatePlayer(nameInput, lifeInput, strengthInput)
        }
      >
        Create player
      </button>
    </>
  );
};

export default Create;
