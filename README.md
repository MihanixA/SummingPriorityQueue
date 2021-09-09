# Solidity Summing Priority Queue

[![NPM Package](https://img.shields.io/npm/v/@mihanix/summing-priority-queue.svg?style=flat-square)](https://www.npmjs.com/package/@mihanix/summing-priority-queue)
![CI](https://github.com/MihanixA/SummingPriorityQueue/actions/workflows/ci.yml/badge.svg)

An utility library implementing summing priority queue in solidity

## Installation

```bash
npm install @mihanix/summing-priority-queue
```

## Usage

An example usage of asset delayed locking

```solidity
pragma solidity ^0.8.7;

import "@mihanix/summing-priority-queue/contracts/SummingPriorityQueue.sol";

contract MyLockingContract {
    using SummingPriorityQueue for SummingPriorityQueue.Heap;

    mappint(address => uint256) _balances;
    mapping(address => SummingPriorityQueue.Heap) internal _withdrawLocks;

    function lock(address holder, uint256 amount, uint256 timeOffset) {
        _withdrawLocks[holder].enqueue(amount, block.timestamp + timeOffset);
    }

    function withdraw(uint256 amount) external {
        _withdrawLocks[msg.sender].drain(block.timestamp);
        uint256 lockedAmount = _withdrawLocks[msg.sender].totalEnqueuedAmount;
        require(amount + lockedAmount <= _balances[msg.sender], "locked-up");
    }
}
```
