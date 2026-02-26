// Typing State
import { useEffect, useState } from "react";
// import type { Stock } from "../types/stock.types";
import { stocks as allStocks } from "../data/stockData"
import { usePortfolioStore } from "../stores/usePortfolioStore";
import { useShallow } from "zustand/shallow";
// import { stocks } from "../data/stockData";

// interface PortfolioState {
//   holdings: Stock[];
//   totalValue: number;
//   gainLoss: number;
//   isLoading: boolean;
//   error: string | null;
// }

// interface PortfolioSummaryProps {
//   availableStocks: Stock[];
// }

// const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({
const PortfolioSummary: React.FC = () => {
  // 1. Generic State - TypeScript knows exact shape
  // const [portfolio, setPortfolio] = useState<PortfolioState>({
  //   holdings: [],
  //   totalValue: 0,
  //   gainLoss: 0,
  //   isLoading: true,
  //   error: null,
  // });

  const holdings = usePortfolioStore((s) => s.holdings);
  const totalValue = usePortfolioStore((s) => s.totalValue);
  const gainLoss = usePortfolioStore((s) => s.gainLoss);
  const isLoading = usePortfolioStore((s) => s.isLoading);
  const error = usePortfolioStore((s) => s.error);

  const {loadPortfolio} = usePortfolioStore(
    useShallow((s) => ({
      loadPortfolio: s.loadPortfolio,
    }))
  )

  useEffect(function() {
    loadPortfolio(allStocks);
  },[allStocks, loadPortfolio]);
  // 2. Primitives - TypeScript infers type fro inital value
  const [selectedSector, setSelectedSector] = useState<string>("All");
  // const [sortBy, setSortBy] = useState<"price" | "change" | "volume">("price");

  // useEffect(() => {
  //   // always use setTimeout if theres calculation on the frontend, even if its for a second
  //   // Simulate async data fetch
  //   setTimeout(() => {
  //     const topThree = availableStocks.slice(0, 3);
  //     const totalValue = topThree.reduce((sum, s) => sum + s.price * 10, 0);
  //     const totalCost = topThree.reduce(
  //       (sum, s) => sum + (s.price - s.change) * 10,
  //       0,
  //     );

  //     setPortfolio({
  //       holdings: topThree,
  //       totalValue,
  //       gainLoss: totalValue - totalCost,
  //       isLoading: false,
  //       error: null,
  //     });
  //   }, 800);
  // }, [availableStocks]);

  const filtered =
    selectedSector === "All"
      ? holdings
      : holdings.filter((s) => s.sector === selectedSector);

  if (isLoading) return <p>Loading portfolio...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ border: "1px solid #D1D5DB", borderRadius: 8, padding: 16 }}>
      <h2>Portfolio Summary</h2>
      <p>Total Value: ${totalValue.toLocaleString()}</p>
      <p style={{ color: gainLoss ? "green" : "red" }}>
        Gain/Loss; ${gainLoss.toFixed(2)}
      </p>
      <select value={selectedSector} onChange={e => setSelectedSector(e.target.value)}>
        <option>All</option>
        <option>Technology</option>
        <option>Finance</option>
        <option>Automotive</option>
      </select>

      <ul>
        {filtered.map((s) => (
            <li key={s.id}> {s.symbol}: ${s.price.toFixed(2)}</li>
        ))}
      </ul>
    </div>
  );
};
export default PortfolioSummary;