import { HistoricalPrices } from '../data/bitcoinData';

export const calculateCurrentValue = (
  initialInvestment: number,
  purchaseDate: string,
  historicalPrices: HistoricalPrices,
  currentPrice: number
): number => {
  const purchasePrice = purchaseDate === 'today' ? currentPrice : historicalPrices[purchaseDate];
  const bitcoinAmount = initialInvestment / purchasePrice;
  return bitcoinAmount * currentPrice;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};