const { expect, assert } = require("chai")
const { ethers, network } = require("hardhat")
require("dotenv").config()


describe("Attendance", () => {
    let attendanceFactory, Attendance

    const NUMBER_OF_STUDENTS = process.env.NUMBER_OF_STUDENTS
    beforeEach(async () => {
        attendanceFactory = await ethers.getContractFactory("Attendance")
        Attendance = await attendanceFactory.deploy(NUMBER_OF_STUDENTS)
        await Attendance.deployed()
    })
    describe("Constructor", () => {
        it("Checks if the AttendanceState of SmartContract is open", async () => {
            const expectedValue = await Attendance.GetAttendanceState()
            expect(expectedValue.toString()).to.equal("0")
        })

        it("checks if the total number is equal to number specified by the lecturer", async () => {
            const expectedValue =
                await Attendance.getTotalNumberOfStudentsExpected()
            assert.equal(
                expectedValue.toString(),
                NUMBER_OF_STUDENTS.toString()
            )
        })

        it("Correctly set The attendance State of the Attendance",async()=>{
            const [deployer , student1, student2] = await ethers.getSigners()
            const expectedValue = await Attendance.checkMyAttendanceState(student1.address)
            expect(expectedValue.toString()).to.equal("0")
        })

        it("Correctly sets the Address of the Lecturer",async()=>{
            const [deployer , student1, student2] = await ethers.getSigners()
            const expectedValue = await Attendance.getLecturerAddress()
            assert.equal(expectedValue.toString(),deployer.address.toString())
        })
    })

    describe("onlyLecturer Allowed function ",async()=>{
         it("Reverts the increment function, if the function is not performed by the deployer",async()=>{
            const [deployer , student1, student2] = await ethers.getSigners()
            const connectStudentAccount =  Attendance.connect(student1)
            await expect(connectStudentAccount.Increment()).to.be.revertedWithCustomError
            
         })

         it("Reverts the decrement function, if the function is not performed by the deployer",async()=>{
            const [deployer , student1, student2] = await ethers.getSigners()
            const connectStudentAccount = await  Attendance.connect(student1)
            await expect(connectStudentAccount.decrement()).to.be.revertedWithCustomError
         })

         
         it("Reverts the current function, if the function is not performed by the deployer",async()=>{
            const [deployer , student1, student2] = await ethers.getSigners()
            const connectStudentAccount = await Attendance.connect(student1)
            await expect(connectStudentAccount.current()).to.be.revertedWithCustomError
         })

         it("Reverts if a student perform the function",async()=>{
            const [deployer , student1, student2] = await ethers.getSigners()
            const connectStudentAccount = await Attendance.connect(student1)
            await expect(connectStudentAccount.getNumberOfStudentsPresent()).to.be.revertedWithCustomError

         })

         it("Shows the number of student that has attended the class",async()=>{
              const accounts = await ethers.getSigners()
              for (let i=0 ; i< 4 ; i++){
                const connectStudentAccounts = await Attendance.connect(accounts[i])
                const studentAccounts = await connectStudentAccounts.enterClass("lad","man")
              }
              const expectedStudentCount = await Attendance.getNumberOfStudentsPresent()
              expect(expectedStudentCount.toString()).to.equal("4")
         })

         it("Shows that an event has been emitted when a student registers",async()=>{
            const [deployer , student1, student2] = await ethers.getSigners()
            const connectStudentAccount = await Attendance.connect(student1)
            await expect(connectStudentAccount.enterClass("lad","man")).to.emit(Attendance,"StuDentRegistered")
         })



    })

    describe("EnterClass",()=>{

         it("Reverts if a student tries to register multiple times",async()=>{
            const [deployer , student1, student2] = await ethers.getSigners()
            const student1EnteringTheClass = await Attendance.connect(student1).enterClass("Azeez","A boss man")
            await expect( Attendance.connect(student1).enterClass("Azeez","A boss man")).to.be.revertedWithCustomError
         })

         it("Student fails to Register After 30 minutes",async()=>{
             const [deployer , student1, student2] = await ethers.getSigners()  
             //  await Attendance.connect(student1).enterClass("Azeez","A boss man")
             await Attendance.connect(student1).enterClass("Azeez","A boss man")
            
             const time = await Attendance.getStudentAttendanceTime(student1.address)
             const lame = time.toString()
             const Ltime = await Attendance.getLecturerTimeStamp()
             const lTime =Ltime.toString()
             await network.provider.send("evm_increaseTime", [1800])
             await network.provider.send("evm_mine",[])
             await expect (Attendance.connect(student2).enterClass("Azeez","A boss man")).to.be.revertedWithCustomError
              const student2time = await Attendance.getStudentAttendanceTime(student2.address)
             const St2lame = time.toString()
         })

         it("state if the student has Registered Before, check if he can enter the class",async()=>{
            const [deployer , student1, student2] = await ethers.getSigners()
            const expectedValueBeforeEnteringTheClass = await Attendance.RegisterStatusOfStudents(student1.address)
            expect(expectedValueBeforeEnteringTheClass).to.equal(false)
            const student1EnteringTheClass = await Attendance.connect(student1).enterClass("Azeez","A boss man")
            const expectedValueAfterEnteringTheClass = await Attendance.RegisterStatusOfStudents(student1.address)
            assert.equal(expectedValueAfterEnteringTheClass,true)

            const studentId = await Attendance.getMyStudentId(student1.address)
            expect(studentId.toString()).to.equal("1")

            const getStudentFilledInDetails = await Attendance.getMyFilledInDetails(student1.address)
            expect(getStudentFilledInDetails.name.toString()).to.equal("Azeez")
            expect(getStudentFilledInDetails.description.toString()).to.equal("A boss man")

         })

         it("Ensures the time the student enters the class is greater than the time the lecturer deploys the contracts",async()=>{
              const [deployer , student1, student2] = await ethers.getSigners()
              const getLecturerTimeStamp = await Attendance.getLecturerTimeStamp()
              const studenEnteringTheClass=await Attendance.connect(student2).enterClass("Azeez","A boss man")
              const studenttime = await Attendance.getStudentAttendanceTime(student2.address)
              assert(getLecturerTimeStamp.toNumber() < studenttime.toNumber())
         })

         it("Returns the length of student that has registered",async()=>{
            const accounts = await ethers.getSigners()
              for (let i=0 ; i< 4 ; i++){
                const connectStudentAccounts = await Attendance.connect(accounts[i])
                const studentAccounts = await connectStudentAccounts.enterClass("lad","man")
              }
              const expectedValue = await Attendance.getStudentList()
              assert.equal(expectedValue.toString(),"4")
         })

         it("Returns the initial Attendance state set by the lecturer",async()=>{
               const LectureAttendanceState = await Attendance.GetAttendanceState()
               assert(LectureAttendanceState.toString(),"0")
         })
    })
})
