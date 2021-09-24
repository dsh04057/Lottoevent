// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract SimpleStorage {
    uint256 storedData;

    struct Project {
        string name;
        string desc;
        uint256 targetMoney;
    }

    Project[] public projects;

    function set(uint256 x) public {
        storedData = x;
    }

    function get() public view returns (uint256) {
        return storedData;
    }

    function addProject(
        string memory _name,
        string memory _desc,
        uint256 _targetMoney
    ) public {
        projects.push(Project(_name, _desc, _targetMoney));
    }

    function getProjectLength() public returns (uint256) {
        return projects.length;
    }
}