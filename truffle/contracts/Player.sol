// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "./StatStruct.sol";

contract Player {
    StatStruct[] private players;

    event PlayerCreated(address indexed _from, StatStruct player);
    event PlayerIsDead(address indexed _from, uint256 counter);

    function create(
        string memory name,
        int256 life,
        uint256 strength
    ) public {
        StatStruct memory newPlayer = StatStruct(
            name,
            life,
            life,
            strength,
            0,
            1
        );
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
        if (players.length == 0) {
            return;
        }

        StatStruct storage fromPlayer = players[fromPlayerIndex];
        StatStruct storage toPlayer = players[toPlayerIndex];

        toPlayer.life -= int256(fromPlayer.strength);

        if (toPlayer.life <= 0) {
            // gain exp on kill.
            gainExperience(fromPlayerIndex, 51);

            kill(toPlayerIndex);
            return;
        }

        // gain exp on hit.
        gainExperience(fromPlayerIndex, 22);
    }

    function kill(uint256 index) private {
        players[index] = players[players.length - 1];
        players.pop();

        emit PlayerIsDead(msg.sender, players.length);
    }

    function gainExperience(uint256 playerIndex, uint256 experience) private {
        StatStruct storage player = players[playerIndex];

        player.experience += experience;

        uint256 experienceToReachNextLevel = (player.level) * 100;

        if (player.experience >= experienceToReachNextLevel) {
            // reset life on level up
            player.maxLife = player.maxLife + 2;
            player.life = player.maxLife;

            player.experience -= experienceToReachNextLevel;
            player.level++;
            player.strength += 2;
        }
    }
}
