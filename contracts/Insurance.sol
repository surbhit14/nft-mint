// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721, Ownable {
    using Counters for Counters.Counter;

   Counters.Counter private _tokenIdCounter;

  string public baseURI;
  uint256 public cost = 1; //wei
  uint256 public maxSupply = 10000;


  constructor(
    string memory _name,
    string memory _symbol,
    string memory _initBaseURI
  ) ERC721(_name, _symbol) {
    setBaseURI(_initBaseURI);
  }
    

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        require(tokenId < maxSupply);
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    function publicMint(address to) external payable {
        require( msg.value >= cost);
        safeMint(to);
    }


  function setCost(uint256 _newCost) external onlyOwner {
    cost = _newCost;
  }

  function setBaseURI(string memory _newBaseURI) public onlyOwner {
    baseURI = _newBaseURI;
  }

}
