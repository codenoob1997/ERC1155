// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/presets/ERC1155PresetMinterPauser.sol";

contract MSJC is ERC1155PresetMinterPauser {
    uint256 public constant MSJC = 0;
    uint16 public constant MAX_SUPPLY = 50;
    uint16 public constant MAX_MINT = 2;
    uint16 public supplyLeft = 50;


    constructor() ERC1155PresetMinterPauser( "https://gateway.pinata.cloud/ipfs/QmTfKUe5URFY94FnfkUyG6KkC6hP2ad3k4KUXjn2Rjq3M1/{id}.json") {
        _mint(msg.sender, MSJC, 2 , "");
        supplyLeft-=2;
    }
    function mint (uint quantity) external payable{
        require(quantity <= 2);
        require(supplyLeft-quantity>=0);
        _mint(msg.sender, MSJC, quantity, "");
        supplyLeft-=2;
    }
    
}
