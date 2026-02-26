// Purpose: TradeHistory + addTrade useActionState

import { create } from "zustand";
import type {Trade} from '../types/stock.types'
import { trades } from "../data/stockData";

// Omit id and date - the store generates these automatically
type NewTradeInput = Omit<Trade, "id" | "date">;

interface TradeStore {
    tradeHistory: Trade[];
    addTrade: (input: NewTradeInput) => void;
}

export const useTradeStore = create<TradeStore>(function(set) {
    return{
        tradeHistory: trades,

        addTrade: function(input) {

            const newTrade: Trade = {
                ...input,
                id: `t${Date.now()}`,
                date: new Date().toISOString().split("T")[0],
            };

            set(function(prev) {
                return {tradeHistory: [newTrade, ...prev.tradeHistory]}
            });
            
        },
      };
})