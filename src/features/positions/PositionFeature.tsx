import DataTable from "../../components/DataTable";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import type { Positions } from "../../types/stock.types";

interface PositionFeatureProps {
  positionData:  Positions[];
}

const PositionFeature: React.FC<PositionFeatureProps> = ({
    positionData
}) =>  {

    const { visibleItems, bottomRef, hasMore } = useInfiniteScroll(positionData, 10);

  return (
    <>
      {/* <h2 style={{ color: "#1E40AF" }}>Positions</h2> */}
      <h2 style={{ color: '#1E40AF', marginTop: 32 }}>
        Positions
        <span style={{ fontSize: 14, fontWeight: 'normal', color: '#6B7280', marginLeft: 12 }}>
          {visibleItems.length} of {positionData.length} shown
        </span>
      </h2>
      <DataTable<Positions>
        data={visibleItems}
        rowKey="id"
        filterKey="symbol"
        columns={[
          { key: "symbol", header: "Symbol", sortable: true },
          { key: "quantity", header: "Qty", sortable: true },
          {
            key: "avgPrice",
            header: "Average Price",
            sortable: true,
            render: (v) => `$${Number(v).toFixed(2)}`,
          },
          { key: "ltp", header: "Last Traded Price", sortable: true },
          {
            key: "pnl",
            header: "Profit & Loss",
            sortable: true,
            render: (v) => {
              const n = Number(v);
              return (
                <span style={{ color: n >= 0 ? "green" : "red" }}>
                  {n >= 0 ? "+" : ""}
                  {n.toFixed(2)}%
                </span>
              );
            },
          },
          {
            key: "pnlPct",
            header: "Profit & Loss %",
            render: (v) => {
              const n = Number(v);
              return (
                <span style={{ color: n >= 0 ? "green" : "red" }}>
                  {n >= 0 ? "+" : ""}
                  {n.toFixed(2)}%
                </span>
              );
            },
          },
        ]}
      />

      <div ref={bottomRef} style={{ height: 1 }} />

      {/* NEW: status messages */}
      {hasMore && (
        <p style={{ textAlign: 'center', color: '#6B7280', padding: '8px 0' }}>
          Scroll down to see more trades...
        </p>
      )}
      {hasMore === false && positionData.length > 0 && (
        <p style={{ textAlign: 'center', color: '#9CA3AF', padding: '8px 0' }}>
          All {positionData.length} trades loaded
        </p>
      )}
    </>
  );
}
export default PositionFeature;