// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "../SummingPriorityQueue.sol";


contract SummingPriorityQueueMock {
    using SummingPriorityQueue for SummingPriorityQueue.Heap;

    SummingPriorityQueue.Heap internal _heap;

    // solhint-disable func-visibility
    constructor () {}

    function enqueue(uint256 key, uint256 value) public {
        _heap.enqueue(key, value);
    }

    function dequeue() public {
        _heap.dequeue();
    }
    
    function totalEnqueuedAmount() public view returns(uint256) {
        return _heap.totalEnqueuedAmount;
    }

    function drain(uint256 ts) public {
        _heap.drain(ts);
    }
}
