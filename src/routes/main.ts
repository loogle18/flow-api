import { getCirculatingSupply, getTvl } from '../services/web3';
import { FLOW, addresses, univ2ContractAddress } from '../tokens/flow';
import { WETH } from '../tokens/weth';

const main = async (server, _, next) => {
  server.get('/stats/circulating-supply', async (_, res) => {
    const circulatingSupply = await getCirculatingSupply(FLOW, addresses);

    return res.code(200).send({ circulatingSupply: circulatingSupply, timestamp: Date.now() });
  });

  server.get('/stats/tvl', async (_, res) => {
    const tvl = await getTvl(WETH, FLOW, univ2ContractAddress);

    return res.code(200).send({ tvl, timestamp: Date.now() });
  });

  next();
};

export default main;
