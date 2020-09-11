import axios from 'axios';

export const getWethPrice = async (): Promise<number> => getPrice('weth');
export const getFlowPrice = async (): Promise<number> => getPrice('flow-protocol');

export const getPrice = async (project: string): Promise<number> => {
  const result = await axios(
    `https://api.coingecko.com/api/v3/coins/${project}`,
    {
      params: {
        tickers: true,
        market_data: false,
        community_data: false,
        developer_data: false,
        sparkline: false
      }
    }
  );
  return result.data.tickers[0].converted_last['usd'];
};
