 
import React from 'react';
import type { Trade } from '../../types/stock.types';
import DataTable          from '../../components/DataTable';
import TradeForm          from '../../components/TradeForm';
import useInfiniteScroll  from '../../hooks/useInfiniteScroll'; // NEW
import { useTradeStore } from '../../stores/useTradeStore';
import { useShallow } from 'zustand/shallow';
import { useStockStore } from '../../stores/useStockStore';
 
 
// interface TradeFeatureProps {
//   tradeHistory:  Trade[];
//   stocks:        Stock[];
//   selectedStock: Stock | null;
//   onSubmitTrade: (input: NewTradeInput) => void;
// }
 
const TradeFeature: React.FC = () => {
 
  // NEW: get the slice of items + ref + flag from the hook
  const {tradeHistory, addTrade} = useTradeStore(
    useShallow((state) => ({
      tradeHistory: state.tradeHistory,
      addTrade: state.addTrade
    }))
  )

  const allStocks = useStockStore((s) => s.allStocks);
  const selectedStock = useStockStore((s) => s.selectedStock);

  const { visibleItems, bottomRef, hasMore } = useInfiniteScroll(tradeHistory, 10);
  return (
    <>
      <h2 style={{ color: '#1E40AF', marginTop: 32 }}>
        Trade History
        <span style={{ fontSize: 14, fontWeight: 'normal', color: '#6B7280', marginLeft: 12 }}>
          {visibleItems.length} of {tradeHistory.length} shown
        </span>
      </h2>
 
      {/* data={visibleItems} is the only change inside DataTable */}
      <DataTable<Trade>
        data={visibleItems}
        rowKey="id"
        filterKey="symbol"
        columns={[
          { key: 'symbol',   header: 'Symbol',  sortable: true },
          { key: 'type',     header: 'Type',
            render: function(value) {
              const colour = value === 'BUY' ? '#166534' : '#991B1B';
              return <strong style={{ color: colour }}>{String(value)}</strong>;
            }
          },
          { key: 'quantity', header: 'Qty',   sortable: true },
          { key: 'price',    header: 'Price', sortable: true,
            render: function(value) { return '$' + Number(value).toFixed(2); }
          },
          { key: 'date',     header: 'Date',  sortable: true },
        ]}
      />
 
      {/* NEW: the sentinel div — observer watches this */}
      <div ref={bottomRef} style={{ height: 1 }} />
 
      {/* NEW: status messages */}
      {hasMore && (
        <p style={{ textAlign: 'center', color: '#6B7280', padding: '8px 0' }}>
          Scroll down to see more trades...
        </p>
      )}
      {hasMore === false && tradeHistory.length > 0 && (
        <p style={{ textAlign: 'center', color: '#9CA3AF', padding: '8px 0' }}>
          All {tradeHistory.length} trades loaded
        </p>
      )}
 
      {/* Trade form is unchanged */}
      <h2 style={{ color: '#1E40AF', marginTop: 32 }}>Place a Trade</h2>
      <TradeForm
        stocks={allStocks}
        onSubmitTrade={addTrade}
        initialValues={selectedStock ?? {}}
      />
    </>
  );
};
 
export default TradeFeature;


