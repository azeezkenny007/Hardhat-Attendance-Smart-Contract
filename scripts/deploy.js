const {ethers} = require("hardhat")
require("dotenv").config()

const NUMBER_OF_STUDENTS = process.env.NUMBER_OF_STUDENTS


async function main() {
  const attendanceFactory = await ethers.getContractFactory("Attendance")
  const Attendance = await attendanceFactory.deploy(NUMBER_OF_STUDENTS)
  await Attendance.deployed()
  console.log('---------Deploying contract please wait -----------')
  console.log(`The contract was deployed to this ${Attendance.address} address`)
  console.log('-----------------------------------------------')
  console.log('-----------------------------------------------')
  console.log('-----------------------------------------------')
  const NewFeedsFactory = await ethers.getContractFactory("NewsFeed")
  const NewsFeed = await NewFeedsFactory.deploy()
  await NewsFeed.deployed()
  console.log('---------Deploying contract please wait -----------')
  console.log(`The contract was deployed to this ${NewsFeed.address} address`)


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().then(()=>{
  process.exit(0)
}).catch((e) => {
  console.log(e);
  process.exit(1);
});
