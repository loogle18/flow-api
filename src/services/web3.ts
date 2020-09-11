import Web3 from 'web3';
import {
  IGetBalanceOf,
  IGetCirculatingSupply,
  IGetTvl,
  TGetTvl,
  IGetDecimals,
  IGetTotalSupply,
} from '../typings/index';
import { getWethPrice, getFlowPrice } from './coinGecko';

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

const getTvl: IGetTvl = async (wethContract, flowContract, univ2ContractAddr) => {
  const [
    wethBalance,
    flowBalance,
    wethPrice,
    flowPrice,
    wethDecimals,
    flowDecimals
  ]: TGetTvl = await Promise.all([
    getBalanceOf(wethContract, univ2ContractAddr),
    getBalanceOf(flowContract, univ2ContractAddr),
    getWethPrice(),
    getFlowPrice(),
    getDecimals(wethContract),
    getDecimals(flowContract)
  ]);

  const tvl = ((parseInt(wethBalance) / 10 ** parseInt(wethDecimals)) * wethPrice) +
    ((parseInt(flowBalance) / 10 ** parseInt(flowDecimals)) * flowPrice);

  return tvl;
};

export {
  getTotalSupply,
  getBalanceOf,
  getDecimals,
  getCirculatingSupply,
  getTvl,
  web3
};
