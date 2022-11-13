const { assert, expect } = require("chai")
const { ethers } = require("hardhat")

describe("NewsFeed", () => {
    let NewFeedsFactory, NewsFeed
    beforeEach(async () => {
        NewFeedsFactory = await ethers.getContractFactory("NewsFeed")
        NewsFeed = await NewFeedsFactory.deploy()
        await NewsFeed.deployed()
    })

    describe("initialState", () => {
        it("to check if the initiaL state of the NewsFeed is empty", async () => {
            const expectedValue = await NewsFeed.getCounter()
            assert(expectedValue.toString() === "0")
        })

        it("To carefully ensure that the initial state of the TotalFeed is set to zero", async () => {
            const expectedValue = await NewsFeed.getTotalFeeds()
            expect(expectedValue).to.equal(0)
        })

        it("Ensures the initialState of the post is null", async () => {
            const expectedValue = await NewsFeed.getAllFeeds()
            //   uint256 id;
            // string title;
            // string description;
            // string location;
            // string category;
            // string coverImageHash;
            // string date;
            // address author;
            assert(expectedValue.length === 0)
        })

        it("To make sure a post is created", async () => {
            const post = await NewsFeed.createFeed(
                "azeez",
                "The man in shoe",
                "abule-osho",
                "action",
                "kenny.png",
                "02/11/23"
            )

            const Feed = await NewsFeed.getFeed("0")
            const [creatorofWebsite, user1, user2] = await ethers.getSigners()
            const author = Feed.author
            const category = Feed.category
            const title = Feed.title
            const location = Feed.location
            const description = Feed.description
            const coverImageHash = Feed.coverImageHash
            const date = Feed.date
            assert(title === "azeez")
            assert.equal(creatorofWebsite.address, author)
            assert(category === "action")
            expect(location).to.equal("abule-osho")
            expect(description).to.equal("The man in shoe")
            expect(coverImageHash).to.equal("kenny.png")
            expect(date).to.equal("02/11/23")
            expect(Feed.length).is.greaterThan(0)
        })

        it("emit an event when contract is created ", async () => {
            await expect(
                NewsFeed.createFeed(
                    "azeez",
                    "The man in shoe",
                    "abule-osho",
                    "action",
                    "kenny.png",
                    "02/11/23"
                )
            ).to.emit(NewsFeed, "FeedCreated")
        })
    })

    describe("Reverts if the post is not created well", () => {
        it("it reverts if title is not written", async () => {
            await expect(
                NewsFeed.createFeed(
                    "",
                    "The man in shoe",
                    "abule-osho",
                    "action",
                    "kenny.png",
                    "02/11/23"
                )
            ).to.be.reverted
        })

        it("it reverts if the description is not specified", async () => {
            await expect(
                NewsFeed.createFeed(
                    "azeez",
                    "",
                    "abule-osho",
                    "action",
                    "kenny.png",
                    "02/11/23"
                )
            ).to.be.reverted
        })

        it("it reverts if the location is not specified", async () => {
            await expect(
                NewsFeed.createFeed(
                    "azeez",
                    "The man in The shoe",
                    "",
                    "action",
                    "kenny.png",
                    "02/11/23"
                )
            ).to.be.reverted
        })

        it("it reverts if the action is not specified", async () => {
            await expect(
                NewsFeed.createFeed(
                    "azeez",
                    "The man in The shoe",
                    "Abule-osho",
                    "",
                    "kenny.png",
                    "02/11/23"
                )
            ).to.be.reverted
        })

        it("it reverts if the coverHashImage is not specified", async () => {
            await expect(
                NewsFeed.createFeed(
                    "azeez",
                    "The man in The shoe",
                    "Abule-osho",
                    "action",
                    "",
                    "02/11/23"
                )
            ).to.be.reverted
        })

        it("it does not revert if the date is not specified", async () => {
            await expect(
                NewsFeed.createFeed(
                    "azeez",
                    "The man in The shoe",
                    "Abule-osho",
                    "action",
                    "kenny",
                    ""
                )
            ).to.not.reverted
        })
    })

    describe("counter and totalcount", () => {
        it("it increases the count and totalcount by 1 after a post created", async () => {
            const totalFeedBeforePostCreated = await NewsFeed.getTotalFeeds()
            const counterBeforePostCreated = await NewsFeed.getCounter()
            expect(totalFeedBeforePostCreated).to.equal(0)
            assert(counterBeforePostCreated.toString() === "0")

            const post = await NewsFeed.createFeed(
                "azeez",
                "The man in shoe",
                "abule-osho",
                "action",
                "kenny.png",
                "02/11/23"
            )

            const totalFeedAfterPostCreated = await NewsFeed.getTotalFeeds()
            const counterAfterPostCreated = await NewsFeed.getCounter()
            expect(totalFeedAfterPostCreated).to.equal(1)
            assert(counterAfterPostCreated.toString() === "1")
        })

        it("increase the counter by number of user that has created post and it shows evidence that different users can create  a post", async () => {
            const [creatorofWebsite, author1, author2, author3] =
                await ethers.getSigners()
            const accounts = await ethers.getSigners()
            const totalFeedBeforePostCreated = await NewsFeed.getTotalFeeds()
            const counterBeforePostCreated = await NewsFeed.getCounter()
            expect(totalFeedBeforePostCreated).to.equal(0)
            assert(counterBeforePostCreated.toString() === "0")
            for (let i = 0; i < 4; i++) {
                const NewsFeedconnectedAccount = await NewsFeed.connect(
                    accounts[i]
                )
                const post = await NewsFeedconnectedAccount.createFeed(
                    "azeez",
                    "The man in shoe",
                    "abule-osho",
                    "action",
                    "kenny.png",
                    "02/11/23"
                )
            }
            const totalNumberOfPost = await NewsFeed.getAllFeeds()
            const totalFeedAfterPostCreated = await NewsFeed.getTotalFeeds()
            const counterAfterPostCreated = await NewsFeed.getCounter()
            expect(totalFeedAfterPostCreated).to.equal(4)
            assert(counterAfterPostCreated.toString() === "4")
            assert(totalNumberOfPost.length === 4)

            const Feed1 = await NewsFeed.getFeed("0")
            const Feed2 = await NewsFeed.getFeed("1")
            const Feed3 = await NewsFeed.getFeed("2")
            const Feed4 = await NewsFeed.getFeed("3")
            const { author, name } = Feed1
            const Feed2Author = Feed2.author
            const Feed3Author = Feed3.author
            const Feed4Author = Feed4.author
            assert.equal(author, creatorofWebsite.address)
            expect(Feed2Author).to.equal(author1.address)
            expect(Feed3Author).to.equal(author2.address)
            expect(Feed4Author).to.equal(author3.address)
        })

        it("increase the counter by number of users that has created post and it shows the evidence that a user can create multiple post", async () => {
            const [creatorofWebsite, author1, author2, author3] =
                await ethers.getSigners()
            const accounts = await ethers.getSigners()
            const totalFeedBeforePostCreated = await NewsFeed.getTotalFeeds()
            const counterBeforePostCreated = await NewsFeed.getCounter()
            expect(totalFeedBeforePostCreated).to.equal(0)
            assert(counterBeforePostCreated.toString() === "0")
            for (let i = 0; i < 4; i++) {
                const post = await NewsFeed.createFeed(
                    "azeez",
                    "The man in shoe",
                    "abule-osho",
                    "action",
                    "kenny.png",
                    "02/11/23"
                )
            }

            const totalNumberOfPost = await NewsFeed.getAllFeeds()
            const totalFeedAfterPostCreated = await NewsFeed.getTotalFeeds()
            const counterAfterPostCreated = await NewsFeed.getCounter()
            expect(totalFeedAfterPostCreated).to.equal(4)
            assert(counterAfterPostCreated.toString() === "4")
            assert(totalNumberOfPost.length === 4)

            const Feed1 = await NewsFeed.getFeed("0")
            const Feed2 = await NewsFeed.getFeed("1")
            const Feed3 = await NewsFeed.getFeed("2")
            const Feed4 = await NewsFeed.getFeed("3")
            const { author, name } = Feed1
            const Feed2Author = Feed2.author
            const Feed3Author = Feed3.author
            const Feed4Author = Feed4.author
            assert.equal(author, creatorofWebsite.address)
            expect(Feed2Author).to.equal(creatorofWebsite.address)
            expect(Feed3Author).to.equal(creatorofWebsite.address)
            expect(Feed4Author).to.equal(creatorofWebsite.address)
        })
    })

    describe("Events",()=>{
        it("check the if id emiited from the event matches the value after a post has been created",async()=>{
            const [creatorofWebsite, author1, author2, author3] = await ethers.getSigners()
            const post = await NewsFeed.createFeed(
                "azeez",
                "The man in shoe",
                "abule-osho",
                "action",
                "kenny.png",
                "02/11/23"
            )
            const txReceipt = await post.wait(1)
            const {id,title,description,location,category,coverImageHash,date,author} = txReceipt.events[0].args
            // const title = txReceipt.events[0].args.title
            // const description =txReceipt.events[0].args.description 
            const counter = await NewsFeed.getCounter()
            expect(id).to.equal(counter)
            assert.equal(title,"azeez")
            expect(description,"The man in shoe")
            expect(location).to.be.equal("abule-osho")
            assert.equal(category,"action")
            expect(coverImageHash).to.equal("kenny.png")
            assert(date ===  "02/11/23" )
            expect(author).to.equal(creatorofWebsite.address)
        })
    })
})
