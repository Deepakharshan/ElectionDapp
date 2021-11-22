//SPDX-License-Identifier:MIT

pragma solidity ^0.8.9;


contract Election{
    
    uint candidateOneVotes;
    uint candidateTwoVotes;
    
    mapping(address  => bool) voters;
    
    
    function candidateOne()public{
        require(!voters[msg.sender]);
        voters[msg.sender] = true;
        candidateOneVotes++;
    }
    
    function candidateTwo()public{
        require(!voters[msg.sender]);
        voters[msg.sender] = true;
         candidateTwoVotes++;
    }
    
    function checkVote()public view returns(bool){
        return voters[msg.sender];
    }
}
