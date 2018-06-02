pragma solidity ^0.4.23;
pragma experimental ABIEncoderV2;

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

  mapping(string => Types.Poll) internal polls;
  mapping(string => Types.Poll) internal pollsCount;

  constructor () public {}

  function () external payable {
    revert();
  }

  function addPoll (string query, uint target) public returns (Types.Poll poll){
    polls[query].creator = msg.sender;
    polls[query].createdAt = block.timestamp;
    polls[query].query = query;
    polls[query].target = target;
    polls[query].kind = "free";
    return polls[query];

  }

  function addPollSponsor (string query, uint target) public payable returns (Types.Poll poll){
    polls[query].creator = msg.sender;
    polls[query].createdAt = block.timestamp;
    polls[query].query = query;
    polls[query].target = target;
    polls[query].kind = "sp";

    return polls[query];

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

}
