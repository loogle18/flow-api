import Web3 from 'web3';
import dotenv from 'dotenv';
import {
  IGetBalanceOf,
  IGetCirculatingSupply,
  IGetDecimals,
  IGetTotalSupply,
} from '../typings/index';
dotenv.config();

const provider = process.env.PROVIDER_ENDPOINT;
if (!provider) throw Error('Provider endpoint is required.');

const web3 = new Web3(new Web3.providers.HttpProvider(provider));

const getTotalSupply: IGetTotalSupply = async contract =>
  await contract.methods.totalSupply().call();

const getBalanceOf: IGetBalanceOf = async (contract, address) =>
  await contract.methods.balanceOf(address).call();

const getDecimals: IGetDecimals = async contract => await contract.methods.decimals().call();

const getCirculatingSupply: IGetCirculatingSupply = async (contract, addresses) => {
  let total = parseInt(await getTotalSupply(contract));
  for (let i = 0; i < addresses.length; i++)
    total -= parseInt(await getBalanceOf(contract, addresses[i]));

  return total;
};

export { getTotalSupply, getBalanceOf, getDecimals, getCirculatingSupply, web3 };
