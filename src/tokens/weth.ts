import { web3 } from '../services/web3';
import { AbiItem } from '../typings/index';

const tokenAddress: string = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';

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
  }
];

export const WETH = new web3.eth.Contract(abi, tokenAddress);
