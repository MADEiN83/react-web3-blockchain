// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

contract Player {
    StatStruct[] private players;

    struct StatStruct {
        string name;
        uint256 life;
        uint256 strength;
    }

    event PlayerCreated(address indexed _from, StatStruct player);

    function create(
        string memory name,
        uint256 life,
        uint256 strength
    ) public {
        StatStruct memory newPlayer = StatStruct(name, life, strength);
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
    function hit(uint256 index) public {
        StatStruct storage player = players[index];
        player.life -= 1;

        if (player.life <= 0) {
            remove(index);
        }
    }

    function remove(uint256 index) public {
        players[index] = players[players.length - 1];
        players.pop();
    }
}
