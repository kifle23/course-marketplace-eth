// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CourseMarketplace {
    enum State {
        Purchased,
        Activicated,
        Deactivated
    }

    struct Course {
        uint256 id;
        uint256 price;
        bytes32 proof;
        address owner;
        State state;
    }
}
