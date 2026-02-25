// FILE: src/App.tsx
// MODULE 2: Lazy Loading & Suspense
//
// WHAT CHANGED vs Module 1:
//   - Added 'lazy' to the React import
//   - 5 feature imports are now lazy() instead of static
//   - Added SuspenseBoundary, TableSkeleton, CardGridSkeleton, FormSkeleton
//   - Each feature is now wrapped in <SuspenseBoundary>
//
// WHAT DID NOT CHANGE:
//   - All useState declarations
//   - filteredStocks logic
//   - handleNewTrade function
//   - All prop values passed to features
 
import { lazy, useState } from 'react';
//                ^    ^
//                |    useState — you already know this
//                lazy — NEW: added to the import

// Part 2 — eager imports (load immediately)
// ── Data imports (UNCHANGED) ─────────────────────────────────────────
import { stocks, trades, positions, holdings } from './data/stockData';
 
// ── Types (UNCHANGED) ────────────────────────────────────────────────
import type{ Stock, Trade } from './types/stock.types';
 
// ── Boundary wrapper (EAGER import — NOT lazy) ───────────────────────
import SuspenseBoundary from './boundaries/SuspenseBoundary';
//
// WHY NOT lazy? SuspenseBoundary SHOWS the skeleton while things load.
// It needs to be ready instantly.
 
// ── Skeleton components (EAGER imports — NOT lazy) ───────────────────
import TableSkeleton    from './skeletons/TableSkeleton';
import CardGridSkeleton from './skeletons/CardGridSkeleton';
import FormSkeleton from './skeletons/FormSkeleton';
// WHY NOT lazy? These ARE the fallback UI.
// They must exist BEFORE the real components arrive.

// Part 3 — lazy imports (separate JS files)
// ── Feature components (LAZY — each becomes a separate chunk) ─────────
 
const LiveQuotesFeature = lazy(function() {
  return import('./features/quotes/LiveQuotesFeature');
});
 
const PortfolioFeature = lazy(function() {
  return import('./features/portfolio/PortfolioFeature');
});
 
const PositionsFeature = lazy(function() {
    return import('./features/positions/PositionFeature')
//   return import('./features/positions/PositionsFeature');
});
 
const HoldingsFeature = lazy(function() {
  return import('./features/holdings/HoldingsFeature');
});
 
const TradeFeature = lazy(function() {
  return import('./features/trades/TradeFeature');
});
 
// After npm run build, Vite creates:
//   LiveQuotesFeature-BxYz12.js
//   PortfolioFeature-CdEf34.js
//   PositionsFeature-GhIj56.js
//   HoldingsFeature-KlMn78.js
//   TradeFeature-OpQr90.js

// Part 4 — state and handlers (identical to Module 1)
type NewTradeInput = Omit<Trade, 'id' | 'date'>;
 
function App() {
 
  // ── State (COMPLETELY UNCHANGED from Module 1) ─────────────────────
  const [selectedStock,  setSelectedStock]  = useState<Stock | null>(null);
  const [searchQuery,    setSearchQuery]    = useState('');
  const [sectorFilter,   setSectorFilter]   = useState('');
  const [tradeHistory,   setTradeHistory]   = useState<Trade[]>(trades);
 
  // ── Filtered stocks (UNCHANGED) ─────────────────────────────────────
  var filteredStocks = stocks.filter(function(stock) {
    var queryLower     = searchQuery.toLowerCase();
    var symbolMatches  = stock.symbol.toLowerCase().includes(queryLower);
    var nameMatches    = stock.name.toLowerCase().includes(queryLower);
    var searchMatches  = symbolMatches || nameMatches;
    var noFilter       = sectorFilter === '';
    var sectorMatches  = noFilter || stock.sector === sectorFilter;
    return searchMatches && sectorMatches;
  });
 
  // ── handleNewTrade (UNCHANGED) ───────────────────────────────────────
  function handleNewTrade(input: NewTradeInput): void {
    var newTrade: Trade = {
      ...input,
      id:   `t${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    setTradeHistory(function(previousTrades) {
      return [newTrade, ...previousTrades];
    });
  }

// Part 5 — JSX with all 5 features wrapped in SuspenseBoundary
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: 24, fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#1E3A8A', marginBottom: 0}}>Stock Market Dashboard</h1>
 
      {/* ── FEATURE 1: Live Quotes — uses BOTH skeletons ── */}
      <SuspenseBoundary
        fallback={
          <>
            <CardGridSkeleton count={filteredStocks.length || 3} />
            <TableSkeleton rows={5} cols={6} title="Live Quotes" />
          </>
        }
      >
        <LiveQuotesFeature
          stocks={filteredStocks}
          selectedStock={selectedStock}
          onSelectStock={setSelectedStock}
          onSearch={setSearchQuery}
          onFilterChange={setSectorFilter}
        />
      </SuspenseBoundary>
 
      {/* ── FEATURE 2: Portfolio Summary ── */}
      <SuspenseBoundary
        fallback={<TableSkeleton rows={3} cols={3} title="Portfolio Summary" />}
      >
        <PortfolioFeature availableStocks={stocks} />
      </SuspenseBoundary>
 
      {/* ── FEATURE 3: Positions ── */}
      <SuspenseBoundary
        fallback={<TableSkeleton rows={5} cols={6} title="Positions" />}
      >
        <PositionsFeature positionData={positions} />
      </SuspenseBoundary>
 
      {/* ── FEATURE 4: Holdings ── */}
      <SuspenseBoundary
        fallback={<TableSkeleton rows={5} cols={5} title="Holdings" />}
      >
        <HoldingsFeature holdings={holdings} />
      </SuspenseBoundary>
 
      {/* ── FEATURE 5: Trade History + Form — uses TWO skeletons ── */}
      <SuspenseBoundary
        fallback={
          <>
            <TableSkeleton rows={3} cols={5} title="Trade History" />
            <FormSkeleton />
          </>
        }
      >
        <TradeFeature
          tradeHistory={tradeHistory}
          stocks={stocks}
          selectedStock={selectedStock}
          onSubmitTrade={handleNewTrade}
        />
      </SuspenseBoundary>
 
    </div>
  );
}
 
export default App;
