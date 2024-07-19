import useSWR from "swr";

const URL =
  "https://api.coingecko.com/api/v3/coins/ethereum?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false";
export const COURSE_PRICE = 15;

const fetcher = async (url: string): Promise<number | null> => {
  const res = await fetch(url);
  const json = await res.json();

  return json.market_data.current_price.usd ?? null;
};

export const useEthPrice = () => {
  const { data, ...rest } = useSWR<number | null>(URL, fetcher);

  const perItem =
    data !== null && data !== undefined
      ? (COURSE_PRICE / data).toFixed(6)
      : null;
  return { eth: { data, perItem, ...rest } };
};
