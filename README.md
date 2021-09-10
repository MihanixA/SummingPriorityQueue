# Solidity Summing Priority Queue

[![NPM Package](https://img.shields.io/npm/v/@mihanix/summing-priority-queue.svg?style=flat-square)](https://www.npmjs.com/package/@mihanix/summing-priority-queue)
![CI](https://github.com/MihanixA/SummingPriorityQueue/actions/workflows/ci.yml/badge.svg)

An utility library implementing summing priority queue in solidity

## Installation

```bash
npm install @mihanix/summing-priority-queue
```

## Interface

### `enqueue`

```solidity
function enqueue(uint256 key, uint256 value) public;
```

Adds an element with `key` and `value` to the heap.
Also adds `value` to `totalEnqueuedAmount`.

### `dequeue`

```solidity
function dequeue() public;
```

Popps an element with the lowest `key` and substracts corresponding `value` from `totalEnqueuedAmount`

### `top` 

```solidity
function top() public returns(uint256);
```

Returns the lowest enqueued `key` 

### `drain`

```solidity
function drain(uint256 ts) public;
```

Dequeues all elements lower then `ts`. Could be useful some times.

## Example Usage

An example usage of asset delayed locking (stock vesting analogy)

```solidity
pragma solidity ^0.8.7;

import "@mihanix/summing-priority-queue/contracts/SummingPriorityQueue.sol";

contract MyLockingContract {
    using SummingPriorityQueue for SummingPriorityQueue.Heap;

    // @notice user balances
    mapping(address => uint256) _balances;
    // @notice vesting locks
    mapping(address => SummingPriorityQueue.Heap) internal _withdrawLocks;

    // @notice lock an amount of tokens for timeOffset for holder 
    function _lock(address holder, uint256 amount, uint256 timeOffset) internal {
        _withdrawLocks[holder].enqueue(amount, block.timestamp + timeOffset);
    }

    // @notice get locked amount of tokens
    function _getLockedAmount(address holder) internal returns(uint256) {
        _withdrawLocks[holder].drain(block.timestamp); // dequeue outdated locks 
        return _withdrawLocks[holder].totalEnqueuedAmount;
    }

    // @notice withdraw tokens and check vesting locks
    function withdraw(uint256 amount) external {
        uint256 lockedAmount = _getLockedAmount(msg.sender);
        require(amount + lockedAmount <= _balances[msg.sender], "locked-up");
        /* 
         * Other business-logic...
         */
    }

}
```
