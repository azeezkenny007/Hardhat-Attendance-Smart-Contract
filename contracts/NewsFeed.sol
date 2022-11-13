// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;
import "hardhat/console.sol";

contract NewsFeed{
 uint256 private counters;
 uint256 private totalFeeds;


 struct Feed{
    uint256 id;
    string title;
    string description;
    string location;
    string category;
    string coverImageHash;
    string date;
    address author;

 }

 event FeedCreated(
  uint256 id,
  string title,
  string description,
  string location,
  string category,
  string coverImageHash,
  string date,
  address author

 );

 Feed[] private feeds;

 function getAllFeeds() public view returns (Feed[] memory){
    return feeds;
 }

 function getTotalFeeds() public view returns(uint256){
  return totalFeeds;
 }

 function getFeed(uint256 _id) public view returns(Feed memory){
    return feeds[_id];
 }

 function getCounter() public view returns(uint256){
   return counters;
 }

 function createFeed(string memory _title,
 string memory _description,
  string memory _location ,
  string memory _category, 
  string memory _coverImageHash,
  string memory _date ) public{
   require(bytes(_coverImageHash).length > 0);
   require(bytes(_title).length > 0);
   require(bytes(_description).length > 0);
   require(bytes(_location).length > 0);
   require(bytes(_category).length > 0);
   require(msg.sender !=address(0));

   totalFeeds++;

   counters++;

   feeds.push(Feed(counters,_title,_description,_location,_category,_coverImageHash,_date,msg.sender));

   emit FeedCreated(counters,_title,_description,_location,_category,_coverImageHash,_date,msg.sender);

  }
}