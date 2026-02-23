// All shared Typescript interfaces

export interface Stock {
    id: string;
    symbol: string;
    name: string;
    price: number;
    change: number; // dollar change
    changePct: number; // percentage change
    volume: number;
    marketCap: number;
    sector: string;
}

export interface Trade {
    id: string;
    stockId: string;
    symbol: string;
    type: 'BUY' | 'SELL';
    quantity: number;
    price: number;
    date: string;
}

export interface Portfolio {
    totalValue: number;
    totalCost: number;
    gainLoss: number;
    holdings: Stock[];
}