// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

contract Player {
    StatStruct[] private players;

    struct StatStruct {
        string name;
        uint256 life;
        uint256 strength;
        uint256 experience;
        uint256 level;
    }

    event PlayerCreated(address indexed _from, StatStruct player);
    event PlayerIsDead(address indexed _from, uint256 counter);

    function create(
        string memory name,
        uint256 life,
        uint256 strength
    ) public {
        StatStruct memory newPlayer = StatStruct(name, life, strength, 0, 0);
        players.push(newPlayer);

        emit PlayerCreated(msg.sender, newPlayer);
    }

    function getTotalPlayers() public view returns (uint256) {
        return players.length;
    }

    function getPlayerById(uint256 index)
        public
        view
        returns (StatStruct memory)
    {
        return players[index];
    }

    function getPlayers() public view returns (StatStruct[] memory) {
        return players;
    }

    /**
     * Fight.
     */
    function hit(uint256 fromPlayerIndex, uint256 toPlayerIndex) public {
        StatStruct storage fromPlayer = players[fromPlayerIndex];
        StatStruct storage toPlayer = players[toPlayerIndex];

        toPlayer.life -= fromPlayer.strength;

        if (toPlayer.life <= 0) {
            kill(toPlayerIndex);
        }
    }

    function kill(uint256 index) public {
        players[index] = players[players.length - 1];
        players.pop();

        emit PlayerIsDead(msg.sender, players.length);
    }
}
