import * as Web3 from 'web3';

export const canonicalWETHBalanceABI: Web3.MethodAbi = {
  type: Web3.AbiType.Function,
  name: 'balanceOf',
  constant: true,
  payable: false,
  stateMutability: 'view',
  inputs: [
    {name: '', type: 'address'},
  ],
  outputs: [
    {name: '', type: 'uint'},
  ],
};

export const canonicalWETHDepositABI: Web3.MethodAbi = {
  type: Web3.AbiType.Function,
  name: 'deposit',
  constant: false,
  payable: true,
  stateMutability: 'payable',
  inputs: [],
  outputs: [],
};

export const canonicalWETHWithdrawABI: Web3.MethodAbi = {
  type: Web3.AbiType.Function,
  name: 'withdraw',
  constant: false,
  payable: false,
  stateMutability: 'nonpayable',
  inputs: [
    {name: 'wad', type: 'uint'},
  ],
  outputs: [],
};
