// src/features/quotes/LiveQuotesFeature.tsx — complete updated file
// FILE: src/features/quotes/LiveQuotesFeature.tsx
// NEW lines are marked with // NEW
 
import React from 'react';
import type { Stock }        from '../../types/stock.types';
import StockCard        from '../../components/StockCard';
import SearchBar        from '../../components/SearchBar';
import useVirtualList   from '../../hooks/useVirtualList'; // NEW
 
const ROW_HEIGHT       = 44;                        // NEW
const VISIBLE_ROWS     = 12;                        // NEW
const CONTAINER_HEIGHT = ROW_HEIGHT * VISIBLE_ROWS; // NEW
 
interface LiveQuotesFeatureProps {
  stocks:         Stock[];
  selectedStock:  Stock | null;
  onSelectStock:  (stock: Stock) => void;
  onSearch:       (query: string) => void;
  onFilterChange: (sector: string) => void;
}
 
const LiveQuotesFeature: React.FC<LiveQuotesFeatureProps> = ({
  stocks, selectedStock, onSelectStock, onSearch, onFilterChange,
}) => {
 
  // NEW: call the hook
  const result       = useVirtualList(stocks, { rowHeight: ROW_HEIGHT, visibleRows: VISIBLE_ROWS, overscan: 3 });
  const visibleItems = result.visibleItems;
  const containerRef = result.containerRef;
  const spacerAbove  = result.spacerAbove;
  const spacerBelow  = result.spacerBelow;
  const startIndex   = result.startIndex;
 
  return (
    <>
      {/* SearchBar — unchanged */}
      <SearchBar onSearch={onSearch} onFilterChange={onFilterChange}
        placeholder="Search by symbol or name..." />
 
      {/* StockCard grid — unchanged */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, marginBottom:24 }}>
        {stocks.map(function(stock) {
          return (
            <StockCard key={stock.id} stock={stock}
              isSelected={selectedStock?.id === stock.id}
              onSelect={onSelectStock} />
          );
        })}
      </div>
 
      <h2 style={{ color:'#1E40AF' }}>
        Live Quotes
        <span style={{ fontSize:14, fontWeight:'normal', color:'#6B7280', marginLeft:12 }}>
          {visibleItems.length} of {stocks.length} rows in DOM
        </span>
      </h2>
 
      {/* NEW: fixed-height scrollable container */}
      <div ref={containerRef} style={{ height:CONTAINER_HEIGHT, overflowY:'auto',
        border:'1px solid #E5E7EB', borderRadius:6 }}>
 
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead style={{ position:'sticky', top:0, zIndex:1 }}>
            <tr style={{ background:'#1E3A8A', color:'#fff' }}>
              <th style={{ padding:'10px 8px', textAlign:'left' }}>Symbol</th>
              <th style={{ padding:'10px 8px', textAlign:'left' }}>Company</th>
              <th style={{ padding:'10px 8px', textAlign:'left' }}>Price</th>
              <th style={{ padding:'10px 8px', textAlign:'left' }}>Change %</th>
              <th style={{ padding:'10px 8px', textAlign:'left' }}>Volume</th>
              <th style={{ padding:'10px 8px', textAlign:'left' }}>Sector</th>
            </tr>
          </thead>
 
          <tbody>
            {/* NEW: spacer above */}
            {spacerAbove > 0 && (
              <tr><td colSpan={6} style={{ height:spacerAbove, padding:0 }} /></tr>
            )}
 
            {/* NEW: only the visible rows */}
            {visibleItems.map(function(stock, indexInSlice) {
              const actualRowNumber = startIndex + indexInSlice;
              const background      = actualRowNumber % 2 === 0 ? '#ffffff' : '#F8FAFC';
              const isPositive      = stock.changePct >= 0;
              const changeColour    = isPositive ? '#166534' : '#991B1B';
              const changePrefix    = isPositive ? '+' : '';
              return (
                <tr key={stock.id} onClick={function() { onSelectStock(stock); }}
                  style={{ height:ROW_HEIGHT, background, cursor:'pointer', borderBottom:'1px solid #E5E7EB' }}>
                  <td style={{ padding:'0 8px', fontSize:14, fontWeight:'bold' }}>{stock.symbol}</td>
                  <td style={{ padding:'0 8px', fontSize:14 }}>{stock.name}</td>
                  <td style={{ padding:'0 8px', fontSize:14 }}>${stock.price.toFixed(2)}</td>
                  <td style={{ padding:'0 8px', fontSize:14, color:changeColour, fontWeight:'bold' }}>
                    {changePrefix}{stock.changePct.toFixed(2)}%
                  </td>
                  <td style={{ padding:'0 8px', fontSize:14 }}>{stock.volume.toLocaleString()}</td>
                  <td style={{ padding:'0 8px', fontSize:14 }}>{stock.sector}</td>
                </tr>
              );
            })}
 
            {/* NEW: spacer below */}
            {spacerBelow > 0 && (
              <tr><td colSpan={6} style={{ height:spacerBelow, padding:0 }} /></tr>
            )}
          </tbody>
        </table>
      </div>
 
      <p style={{ fontSize:13, color:'#9CA3AF', marginTop:6 }}>
        {stocks.length} total — {visibleItems.length} rows in the browser right now
      </p>
    </>
  );
};
 
export default LiveQuotesFeature;
