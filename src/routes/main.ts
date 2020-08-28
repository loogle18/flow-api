import { getCirculatingSupply } from '../services/web3';
import { FLOW, addresses } from '../tokens/flow';

const main = async (server, _, next) => {
  server.get('/stats/circulating-supply', async (_, res) => {
    const circulatingSupply = await getCirculatingSupply(FLOW, addresses);

    return res.code(200).send({ circulatingSupply: circulatingSupply, timestamp: Date.now() });
  });

  next();
};

export default main;
