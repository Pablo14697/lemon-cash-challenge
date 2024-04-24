export type Quote = {
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_90d: number;
  price: number;
};

export type CriptoCurrencyInfo = {
  id: string | null;
  name: string;
  symbol: string;
  quote: {
    USD: Quote;
  };
};
