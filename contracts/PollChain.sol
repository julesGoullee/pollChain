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

  function vote (string pollTitle) public returns (bool success){

    require(polls[pollTitle].createdAt != 0);
    uint contributorsLength = polls[pollTitle].contributors.length;

    for (uint i=0; i < contributorsLength; i++) {

      require(polls[pollTitle].contributors[i] != msg.sender);

    }

    polls[pollTitle].contributors.push(msg.sender);

    return true;

  }
//
//  function vote (string pollQuery, string pollQuerySponsored, bool voteRejected) public returns (bool success){
//
//    uint gas = gasleft();
//    uint gasPrice = tx.gasprice;
//    uint cost = gas.mul(gasPrice);
//    require(polls[pollQuery].createdAt != 0);
//    require(polls[pollQuerySponsored].createdAt != 0);
//    uint contributorsLength = polls[pollQuery].contributors.length;
//
//    for (uint i=0; i < contributorsLength; i++) {
//
//      require(polls[pollQuery].contributors[i] != msg.sender);
//
//    }
//
//    uint contributorsSponsoredLength = polls[pollQuerySponsored].contributors.length;
//
//    require(contributorsSponsoredLength <= polls[pollQuerySponsored].target);
//
//    for (uint j=0; j < contributorsLength; j++) {
//
//      require(polls[pollQuerySponsored].contributors[j] != msg.sender);
//
//    }
//
//    polls[pollQuerySponsored].contributors.push(msg.sender);
//
//    if(voteRejected){
//
//      polls[pollQuerySponsored].contributorsReject = polls[pollQuerySponsored].contributorsReject.add(1);
//
//    }
//
//    msg.sender.transfer(cost);
//    return true;
//
//  }

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
