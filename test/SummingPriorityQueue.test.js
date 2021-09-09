const { expect } = require('chai');
const { ethers } = require('hardhat');

describe("SummingPriorityQueue", async function() {
    beforeEach(async function() {
        [ owner ] = await ethers.getSigners();

        Library = await ethers.getContractFactory("SummingPriorityQueue");
        library = await Library.deploy()
        Contract = await ethers.getContractFactory("SummingPriorityQueueMock", {
            libraries: {
                SummingPriorityQueue: library.address
            }
        });
        contract = await Contract.deploy();
    });

    if("Initial enqueued amount should be zero", async function() {
        expect(await contract.totalEnqueuedAmount()).to.equals(0);
    });

    it("Enqueue should work", async function() {
        await contract.enqueue(1, 10);
        expect((await contract.totalEnqueuedAmount()).toString()).to.equals("10");
    });

    it("Dequeue should work", async function() {
        await contract.enqueue(1, 10);
        await contract.dequeue();
        expect((await contract.totalEnqueuedAmount()).toString()).to.equals("0");
    });

    it("Heap should maintain order", async function() {
        await contract.enqueue(3, 30);
        await contract.enqueue(1, 10);
        await contract.enqueue(2, 20);
        expect((await contract.totalEnqueuedAmount()).toString()).to.equals("60");
        await contract.dequeue();
        expect((await contract.totalEnqueuedAmount()).toString()).to.equals("50");
        await contract.dequeue();
        expect((await contract.totalEnqueuedAmount()).toString()).to.equals("30");
        await contract.dequeue();
        expect((await contract.totalEnqueuedAmount()).toString()).to.equals("0");
    });

    it("Drain should work", async function() {
        await contract.enqueue(3, 30);
        await contract.enqueue(1, 10);
        await contract.enqueue(2, 20);
        await contract.drain(2);
        expect((await contract.totalEnqueuedAmount()).toString()).to.equals("50");
        await contract.drain(100);
        expect((await contract.totalEnqueuedAmount()).toString()).to.equals("0");
    });
});
