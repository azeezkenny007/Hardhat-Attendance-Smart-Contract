# ⚖👩‍⚖️ __ATTENDANCE SMART CONTRACT__

__This is a smart contract that solves the problem of representation/attendance in any Learning enviroment__

<div style="margin-top:30px"></div>

## 🌌🚀 __CONTRACT FUNCTIONS__

<div style="margin-top:20px"></div>

|__Function Name__|__Function Actions__|__What does it Return__|__Who has access__|__Parameters__|
|:------------|:-------------|:----------------|:----------|:-------------|
|__Increment__|__It increases the number of student valueId number by 1__|__uint256__|__Lecturer/Administrator/Deployer__|__None__|
|__decrement__|__It decreases the number of student valueId number by 1__|__uint256__|__Lecturer/Administrator/Deployer__|__None__|
|__current__|__It get current currenvalueId number of the student__|__uint256__|__Lecturer/Administrator/Deployer__|__None__|
|__checkMyAttendanceState__|__Checks the attendance state of that student__|__Attendance State__ _e.g Attenstate ? Open === 0 : close === 1_  |__Student/Lecturer__|__Student Representation i.e Student Wallet Address__|
|__enterClass__|__Validate and check the conditions required to enter the class i.e in other words enter the class__| ----------|__Student/Lecturer__|__Student Name, Student Description__|
|__getTotalNumberOfStudentsExpected__|__Shows number of students that expected by the Lecturer/Deployer__|__uint256__|__Lecturer/Administrator/Deployer__|__None__|
|__getMyFilledInDetails__|__Show the details inputed by the student__|__Student Details__|__Student/Lecturer__|__Student Representation i.e Student Wallet Address__|
|__getMyStudentId__|__Show the Student's Id__|__uint256__|__Student/Lecturer__|__Student Representation i.e Student Wallet Address__|
|__getNumberOfStudentsPresent__|__Get the number of student that has registered__|__uint256__|__Lecturer/Administrator/Deployer__|__None__|
|__RegisterStatusOfStudents__|__Show if the student has registered before or not__ _RegisterStatusOfStudents ? true : false_ |__uint256__|__Student/Lecturer__|__Student Representation i.e Student Wallet Address__|
|__GetAttendanceState__|__Get the initial state of the Attendance__|__Attendance State__ _e.g Attenstate ? Open === 0 : close === 1_ |__Student/Deployer__|__None__|
|__getStudentList__|__Return an Array of Registered Student__|__Get the total number of student that has registered and their details__|__Student/Deployer__|__None__|
|__getLecturerAddress__|__Get the Lecturer/Deployer Address__|__Lecturer Address__|__Lecturer/Deployer/Administrator__|__None__|
|__getStudentAttendanceTime__|__Get the Time the student registers or sign the attendance__|__uint256__|__Student/Lecturer__|__Student Representation i.e Student Wallet Address__|
|__getLecturerTimeStamp__|__Get the Time the Lecturer creates the Attendance__|__uint256__|__Student/Lecturer__|__None__|

<div style="margin-top:30px"></div>

## 🐛🐜  __ERRORS__
<div style="margin-top:30px"></div>

> #### __error Attendance__NeedLecturerSignature()__
>
>   *  _The error that occurs when you try to perform the lecturer/deployer/Administrator  actions_
<div style="margin-top:30px"></div>

> #### __error Attendance__youHaveRegisteredBefore()__
>
>   *  _The error that occurs when the student that has registered before wants to register again or sign the attendance again_

<div style="margin-top:30px"></div>

> #### __error Attendance__youHaveAnId()__
>
>   *  _The error that occurs when the student has a student Id_


<div style="margin-top:30px"></div>

> #### __error Attendance__youCannotRegisterAgain()__
>
>   *  _The error that occurs when the student has passed the time allowed to sign the attendance_

<div style="margin-top:30px"></div>

> #### __error Attendance__yourAttendanceNeeedToBeOpen()__
>
>   *  _The error that occurs when the initialstate of the attendance is not open_

<div style="margin-top:30px"></div>

> #### __error Attendance__youCannotRegiterTwice()__
>
>   *  _The error that occurs when the student attendance state is closed_

*** <div style="margin-top:30px"></div>**

## 👩‍💻 __COMMANDS TO USE__

> * __To Compile the Contract__   

```solidity
          yarn hardhat compile
```


> * __To Clear the Compile__ Contract

```solidity
yarn hardhat clean
```
> * __To Deploy the Contract on hardhat__ 
 ```solidity
 yarn hardhat run scripts/<scripts file name>
 ```
> * __To Deploy the contract to a testnet__ 
 ```solidity
yarn hardhat run scripts/<scripts file name> --network <network name> 
```
> * __To Run Test on hardhat__   
 ```solidity
 yarn hardhat test
  ```
> * __To Run Test on a particular network__ 
```solidity
yarn hardhat test --network <network name> 
```
> * __To Run a paricular Test__ 
```solidity
 yarn hardhat test --grep <name of the test in quote>
 ```
>  * __To Run a Specific Test on a Particular Network__ 
 ```solidity
 yarn hardhat test --grep <name of the test in quote>  --network <network name> 
 ```

```bash
   The preffered networks can be found in the hardhat config file
```
<div style="margin-top:30px"></div>

## 📱  __Contact__
- __Phone number - +2348134570701__
* __Twitter - [ken_okha](https://twitter.com/Ken_okha "ken_okha")__
* __BlockChain developer__









