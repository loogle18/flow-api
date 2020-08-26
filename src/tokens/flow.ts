import { web3 } from '../services/web3';
import { AbiItem } from '../typings/index';

const tokenAddress: string = '0xC6e64729931f60D2c8Bc70A27D66D9E0c28D1BF9';

const abi: AbiItem[] = [
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
];

export const addresses: string[] = [
  //contracts
  '0x2ced5bb2e0734d6f41dc91fa5f63060117e9ee0a',
  '0xfc3d00be8039ca3c962d8ae87ffb3cf61eda13cf',
  '0xf797dbf406787fb6b31f4a906da05fb8e336e7fa',
  '0x8bfa5a0a0658e2aea7d6486de405de31950e80fc',
  //
  '0x85566cf91d9c44d8817f89afdb8902b22ae710a7',
  '0xe26a8346b073662d2083cbb777e5bb58f7e271ba',
  '0x12a4cde32693843b83fe8377b997b4a3f22dbad9',
];

export const FLOW = new web3.eth.Contract(abi, tokenAddress);
