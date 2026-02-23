// src/data/stockData.ts
import type { Stock, Trade, Positions } from '../types/stock.types';
 
export const stocks: Stock[] = [
  { id: '1', symbol: 'AAPL', name: 'Apple Inc.',
    price: 189.30, change: 2.15, changePct: 1.15,
    volume: 54_200_000, marketCap: 2_950_000_000_000, sector: 'Technology' },
  { id: '2', symbol: 'GOOGL', name: 'Alphabet Inc.',
    price: 141.80, change: -0.95, changePct: -0.67,
    volume: 22_300_000, marketCap: 1_770_000_000_000, sector: 'Technology' },
  { id: '3', symbol: 'MSFT', name: 'Microsoft Corp.',
    price: 378.90, change: 4.20, changePct: 1.12,
    volume: 19_600_000, marketCap: 2_810_000_000_000, sector: 'Technology' },
  { id: '4', symbol: 'TSLA', name: 'Tesla Inc.',
    price: 248.50, change: -7.30, changePct: -2.85,
    volume: 98_700_000, marketCap: 791_000_000_000, sector: 'Automotive' },
  { id: '5', symbol: 'JPM',  name: 'JPMorgan Chase',
    price: 196.40, change: 1.05, changePct: 0.54,
    volume: 8_900_000, marketCap: 568_000_000_000, sector: 'Finance' },
];
 
export const trades: Trade[] = [
  { id: 't1', stockId: '1', symbol: 'AAPL', type: 'BUY',
    quantity: 10, price: 175.00, date: '2024-01-15' },
  { id: 't2', stockId: '3', symbol: 'MSFT', type: 'BUY',
    quantity: 5,  price: 360.00, date: '2024-02-20' },
  { id: 't3', stockId: '4', symbol: 'TSLA', type: 'SELL',
    quantity: 8,  price: 265.00, date: '2024-03-10' },
];

export const positions: Positions[] = [
  { id: 'p1', symbol: 'AAPL',  quantity: 10,
    avgPrice: 175.00, ltp: 189.30,
    pnl:  143.00, pnlPct:  8.17 },
  { id: 'p2', symbol: 'MSFT',  quantity:  5,
    avgPrice: 360.00, ltp: 378.90,
    pnl:   94.50, pnlPct:  5.25 },
  { id: 'p3', symbol: 'TSLA',  quantity:  8,
    avgPrice: 265.00, ltp: 248.50,
    pnl: -132.00, pnlPct: -6.23 },
  { id: 'p4', symbol: 'GOOGL', quantity: 15,
    avgPrice: 145.00, ltp: 141.80,
    pnl:  -48.00, pnlPct: -2.21 },
  { id: 'p5', symbol: 'JPM',   quantity: 20,
    avgPrice: 192.00, ltp: 196.40,
    pnl:   88.00, pnlPct:  2.29 },
];