export interface ColorConfig {
  color: string;
  border: string;
  background: string;
}

export const defaultMarketConfig: ColorConfig = {
  color: '#C02117',
  border: '#FCB9B5',
  background: '#FDDCDA',
};

export const configMarket = new Map<string, ColorConfig>([
  ['new-york', defaultMarketConfig],
]);
