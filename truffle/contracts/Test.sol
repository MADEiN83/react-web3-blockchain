// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

contract Test {
    uint256 number;

    function get() public view returns (uint256) {
        return number;
    }

    function set(uint256 value) public {
        number = value;
    }
}
