import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';

interface IGetTotalSupply {
  (contract: Contract): Promise<string>;
}
interface IGetBalanceOf {
  (contract: Contract, address: string): Promise<string>;
}
interface IGetDecimals {
  (contract: Contract): Promise<string>;
}
interface IGetCirculatingSupply {
  (contract: Contract, addresses: string[]): Promise<number>;
}
interface IGetTvl {
  (wethContract: Contract, flowContract: Contract, univ2ContractAddr: string): Promise<number>;
}

type TGetTvl = [string, string, number, number, string, string];

export {
  AbiItem,
  Contract,
  IGetTotalSupply,
  IGetBalanceOf,
  IGetDecimals,
  IGetCirculatingSupply,
  IGetTvl,
  TGetTvl
};
