import Web3 from 'web3';
import {
  IGetBalanceOf,
  IGetCirculatingSupply,
  IGetDecimals,
  IGetTotalSupply,
} from '../typings/index';

const provider = process.env.PROVIDER_ENDPOINT;
if (!provider) throw Error('Provider endpoint is required.');

const web3 = new Web3(new Web3.providers.HttpProvider(provider));

const getTotalSupply: IGetTotalSupply = async contract =>
  contract.methods.totalSupply().call();

const getBalanceOf: IGetBalanceOf = async (contract, address) =>
  contract.methods.balanceOf(address).call();

const getDecimals: IGetDecimals = async contract => contract.methods.decimals().call();

const getCirculatingSupply: IGetCirculatingSupply = async (contract, addresses) => {
  const balancePromises = addresses.map((address) => getBalanceOf(contract, address));
  const [total, balances] : (string | string[])[] = await Promise.all([
    getTotalSupply(contract),
    Promise.all(balancePromises)
  ]);
  const circulating = balances.reduce((accum, balance) => {
    accum -= parseInt(balance);
    return accum;
  }, parseInt(total));

  return circulating;
};

export { getTotalSupply, getBalanceOf, getDecimals, getCirculatingSupply, web3 };
