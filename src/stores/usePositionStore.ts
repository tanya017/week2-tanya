import { create } from 'zustand';
import type { Positions } from '../types/stock.types';
import { positions as initialPositions } from '../data/stockData';

interface PositionsStore {
  positions:      Positions[];
  addPosition:    (position: Positions)                     => void;
  removePosition: (id: string)                              => void;
  updatePosition: (id: string, changes: Partial<Positions>) => void;
}

export const usePositionsStore = create<PositionsStore>(function(set) {
  return {
    positions: initialPositions,

    addPosition: function(position) {
      set(function(prev) {
        // Does this stock already have an open position?
        const existing = prev.positions.find(function(p) {
          return p.symbol === position.symbol;
        });

        if (existing) {
          // Merge: add quantities, recalculate average price
          return {
            positions: prev.positions.map(function(p) {
              if (p.symbol !== position.symbol) return p;
              const totalQty = p.quantity + position.quantity;
              const avgPrice = (
                (p.avgPrice * p.quantity) +
                (position.avgPrice * position.quantity)
              ) / totalQty;
              return { ...p, quantity: totalQty, avgPrice: avgPrice };
            }),
          };
        }

        // New position: just append it
        return { positions: [...prev.positions, position] };
      });
    },

    removePosition: function(id) {
      set(function(prev) {
        // filter() creates a NEW array without the matching item
        return {
          positions: prev.positions.filter(function(p) {
            return p.id !== id;
          }),
        };
      });
    },

    updatePosition: function(id, changes) {
      set(function(prev) {
        // map() creates a NEW array; only the matching item changes
        return {
          positions: prev.positions.map(function(p) {
            if (p.id !== id) return p;
            return { ...p, ...changes }; // merge changes into existing
          }),
        };
      });
    },
  };
});
