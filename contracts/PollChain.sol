pragma solidity ^0.4.23;
pragma experimental ABIEncoderV2;

import "zeppelin-solidity/contracts/math/SafeMath.sol";

library Types {

  struct Poll {
    address creator;
    string title;
    string query;
    uint createdAt;
    string kind;
    uint target;
    address[] contributors;
    uint contributorsReject;
  }

}

contract PollChain {

  using SafeMath for uint;

  mapping(string => Types.Poll) internal polls;
  string[] public pollsIndex;
  uint public pollsCount;
  uint public costPeerVote;

  constructor () public {

    pollsCount = 0;
    costPeerVote = 100000000000000000; // 0.1 ether

  }

  function () external payable {
    revert();
  }

  function addPoll (string query, string title, uint target, bool isSponsoring) public payable returns (bool success){
    polls[title].creator = msg.sender;
    polls[title].createdAt = block.timestamp;
    polls[title].title = title;
    polls[title].query = query;
    polls[title].target = target;

    if(isSponsoring){

      require(msg.value == costPeerVote.mul(target));
      polls[title].kind = "sponsoring";

    } else {

      polls[title].kind = "free";

    }

    pollsIndex.push(title);
    pollsCount = pollsCount.add(1);
    return true;

  }

  function vote (
    string pollTitle,
    string pollTitleSponsored,
    bool voteRejected) public returns (bool success){

    uint gas = gasleft();
    uint gasPrice = tx.gasprice;
    uint cost = gas.mul(gasPrice);
    require(polls[pollTitle].createdAt != 0);
    uint contributorsLength = polls[pollTitle].contributors.length;

    for (uint i=0; i < contributorsLength; i++) {

      require(polls[pollTitle].contributors[i] != msg.sender);

    }

    polls[pollTitle].contributors.push(msg.sender);

    if(keccak256(pollTitleSponsored) != keccak256("") ){

      require(polls[pollTitleSponsored].createdAt != 0);

    uint contributorsSponsoredLength = polls[pollTitleSponsored].contributors.length;

      require(contributorsSponsoredLength <= polls[pollTitleSponsored].target);

      for (uint j=0; j < contributorsLength; j++) {

        require(polls[pollTitleSponsored].contributors[j] != msg.sender);

      }

      polls[pollTitleSponsored].contributors.push(msg.sender);

      if(voteRejected){

        polls[pollTitleSponsored].contributorsReject = polls[pollTitleSponsored].contributorsReject.add(1);

      }

      msg.sender.transfer(cost);

    }

    return true;

  }

  function getPoll(string title) public view returns (
    address,
    string,
    string,
    uint,
    string,
    uint,
    uint
  ){

    return (
      polls[title].creator,
      polls[title].title,
      polls[title].query,
      polls[title].createdAt,
      polls[title].kind,
      polls[title].target,
      polls[title].contributors.length
    );

  }

}
