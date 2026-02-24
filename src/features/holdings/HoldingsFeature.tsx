// FILE: src/features/holdings/HoldingsFeature.tsx
// PURPOSE: Display the Holdings table — shows invested vs current value.
 
import React from 'react';
import type{ Holding } from '../../types/stock.types';
import DataTable   from '../../components/DataTable';
import PieChartHoldings from '../../components/PieChartHoldings';
 
interface HoldingsFeatureProps {
  holdings: Holding[];
}
 
function pnlCell(value: unknown, suffix: string = ''): React.ReactNode {
  var numberValue  = Number(value);
  var isPositive   = numberValue >= 0;
  var textColour   = isPositive ? '#166534' : '#991B1B';
  var prefix       = isPositive ? '+' : '';
  var currencySign = suffix === '%' ? '' : '$';
  return (
    <span style={{ color: textColour, fontWeight: 'bold' }}>
      {prefix}{currencySign}{numberValue.toFixed(2)}{suffix}
    </span>
  );
}
 
const HoldingsFeature: React.FC<HoldingsFeatureProps> = ({ holdings }) => {
  return (
    <>
      <h2 style={{ color: '#1E40AF' }}>Holdings</h2>
      <DataTable<Holding>
        data={holdings}
        rowKey="id"
        filterKey="symbol"
        // pageSize={10}
        columns={[
          { key: 'symbol',        header: 'Symbol',         sortable: true },
          { key: 'quantity',           header: 'Qty',            sortable: true },
          { key: 'investedValue', header: 'Invested Value', sortable: true,
            render: function(value) { return '$' + Number(value).toLocaleString(); }
          },
          { key: 'currentValue',  header: 'Current Value',  sortable: true,
            render: function(value) { return '$' + Number(value).toLocaleString(); }
          },
          { key: 'totalReturn',   header: 'Total Return',   sortable: true,
            render: function(value) { return pnlCell(value); }
          },
        ]}
      />

      <PieChartHoldings data={holdings}/>
    </>
  );
};
 
export default HoldingsFeature;
