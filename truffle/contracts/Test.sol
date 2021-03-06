// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

contract Test {
    uint256 number;
    string str;

    event StringHasChanged(address indexed _from, string str);
    event NumberHasChanged(address indexed _from, uint256 number);

    function get() public view returns (uint256) {
        return number;
    }

    function set(uint256 _number) public {
        number = _number;
        emit NumberHasChanged(msg.sender, _number);
    }

    function getString() public view returns (string memory) {
        return str;
    }

    function setString(string memory _str) public {
        str = _str;
        emit StringHasChanged(msg.sender, _str);
    }
}
