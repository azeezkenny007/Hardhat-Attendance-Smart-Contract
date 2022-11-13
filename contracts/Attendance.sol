// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Attendance {
  /**
   * @dev This are er
   */
    error Attendance__NeedLecturerSignature();
    error Attendance__youHaveRegisteredBefore();
    error Attendance__youHaveAnId();
    error Attendance__youCannotRegisterAgain();
    error Attendance__yourAttendanceNeeedToBeOpen();
    error Attendance__youCannotRegiterTwice();


    event StuDentRegistered(address indexed mySchoolAddress, uint256 _Id);

    uint256 private immutable i_numberOfStudents;
    address private immutable i_lecturer;

    mapping (address => StudentDetails) private addressToStudentDetails;
    mapping (address => bool) private _hasTheStudentRegisteredBefore;
    mapping(address => AttendanceState) private _checkMyAttendanceState;
    mapping (address => uint256) private s_StudentAttendanceTime;

      uint256 private  studentCount;
      uint256 private s_timeStamp ; 

    enum AttendanceState{
        OPEN,CLOSED
    }

    AttendanceState  private s_attendanceState;

    constructor (uint numberOfStudents){
        i_numberOfStudents = numberOfStudents;
        i_lecturer =msg.sender;
        s_timeStamp = block.timestamp ; 
        s_attendanceState = AttendanceState.OPEN;
    } 

    modifier onlyLecturer(){
         if(i_lecturer != msg.sender){
             revert Attendance__NeedLecturerSignature();
         }
         _;
    }
    
    struct StudentDetails {
        string name ;
        uint256 _value;
        string description;
    }

    StudentDetails[] private _individualDetails;


    StudentDetails private _classMatesRecords;

    function Increment() public onlyLecturer {
        _classMatesRecords._value +=1 ;
    }

    function decrement() public onlyLecturer  {
          _classMatesRecords._value -=1 ;
    }

    function current() public onlyLecturer view returns (uint256){
        return _classMatesRecords._value ;
    }


    function checkMyAttendanceState(address studentAddress)  public view returns(AttendanceState){
        return _checkMyAttendanceState[studentAddress];
    }

    

    function enterClass(string memory _name, string memory _description) public  {
           if(_hasTheStudentRegisteredBefore[msg.sender]){
               revert Attendance__youHaveRegisteredBefore();
           }

           if(s_attendanceState !=AttendanceState.OPEN){
              revert Attendance__yourAttendanceNeeedToBeOpen();
           }

           
           s_StudentAttendanceTime[msg.sender] = block.timestamp;
           uint256 lecturerAttendanceTime = s_timeStamp;
           
           if((s_StudentAttendanceTime[msg.sender] - lecturerAttendanceTime) > 30 minutes){
               revert Attendance__youCannotRegisterAgain();
           }      

           if(addressToStudentDetails[msg.sender]._value >= 1){
               revert Attendance__youHaveAnId();
           }

           if(_checkMyAttendanceState[msg.sender] == AttendanceState.CLOSED){
               revert Attendance__youCannotRegiterTwice();
           }

           studentCount += 1 ;
           StudentDetails memory myDetails =StudentDetails(_name,studentCount,_description);
           _individualDetails.push(myDetails);
           addressToStudentDetails[msg.sender] = myDetails;
           _hasTheStudentRegisteredBefore[msg.sender] = true;
            _checkMyAttendanceState[msg.sender] = AttendanceState.CLOSED;
           emit StuDentRegistered(msg.sender,studentCount);
    }


    function getTotalNumberOfStudentsExpected() public onlyLecturer view returns(uint256){
         return i_numberOfStudents;
    }

    function getMyFilledInDetails(address studentAddress) public view returns (StudentDetails memory){
         return addressToStudentDetails[studentAddress];
    }

    function getMyStudentId(address studentAddress) public view returns(uint256){
        return addressToStudentDetails[studentAddress]._value;
    }

    function getNumberOfStudentsPresent() public onlyLecturer view returns(uint256){
         return studentCount;
    }

    function RegisterStatusOfStudents(address studentAddress) public view returns (bool){
        return _hasTheStudentRegisteredBefore[studentAddress];
    }

    function GetAttendanceState() public view returns(AttendanceState){
        return  s_attendanceState;
    }

    function getStudentList() onlyLecturer public view returns(uint256) {
         return _individualDetails.length;
    }

    function getLecturerAddress() onlyLecturer  public view returns (address){
         return i_lecturer;
    }

    function getStudentAttendanceTime(address studentAddress) public view returns(uint256){
         return s_StudentAttendanceTime[studentAddress];
    }

    function getLecturerTimeStamp() public view returns(uint256){
         return s_timeStamp;
    }






}