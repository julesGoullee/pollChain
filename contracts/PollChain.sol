pragma solidity ^0.4.23;
pragma experimental ABIEncoderV2;

import "zeppelin-solidity/contracts/math/SafeMath.sol";

library Types {

  struct Poll {
    address creator;
    string query;
    uint createdAt;
    string kind;
    uint target;
    address[] contributors;
  }

}

contract PollChain {

  using SafeMath for uint;

  mapping(string => Types.Poll) internal polls;
  string[] public pollsIndex;
  uint public pollsCount;

  constructor () public {

    pollsCount = 0;

  }

  function () external payable {
    revert();
  }

  function addPoll (string query, uint target) public returns (bool success){
    polls[query].creator = msg.sender;
    polls[query].createdAt = block.timestamp;
    polls[query].query = query;
    polls[query].target = target;
    polls[query].kind = "free";
    pollsIndex.push(query);
    pollsCount = pollsCount.add(1);
    return true;

  }

  function addPollSponsor (string query, uint target) public payable returns (bool success){
    polls[query].creator = msg.sender;
    polls[query].createdAt = block.timestamp;
    polls[query].query = query;
    polls[query].target = target;
    polls[query].kind = "sp";
    pollsIndex.push(query);
    pollsCount = pollsCount.add(1);
    return true;

  }

  function vote (string pollQuery) public returns (bool success){

    require(polls[pollQuery].createdAt != 0);
    uint contributorsLength = polls[pollQuery].contributors.length;

    for (uint i=0; i < contributorsLength; i++) {

      require(polls[pollQuery].contributors[i] != msg.sender);

    }

    polls[pollQuery].contributors.push(msg.sender);

    return true;

  }

  function getPoll(string query) public view returns (
    address,
    string,
    uint,
    string,
    uint,
    uint
  ){

    return (
      polls[query].creator,
      polls[query].query,
      polls[query].createdAt,
      polls[query].kind,
      polls[query].target,
      polls[query].contributors.length
    );

  }

}
