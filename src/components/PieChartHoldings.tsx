import { PieChart, Pie, Cell, Tooltip, Legend} from "recharts";
import type { Holding } from "../types/stock.types";

interface PieChartHoldingsProp {
  data: Holding[];
}

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const COLORS = [
  "#003f5c",
  "#2f4b7c",
  "#665191",
  "#a05195",
  "#d45087",
  "#f95d6a",
  "#ff7c43",
  "#ffa600",
  "#00ced1",
  "#20b2aa",
];

const PieChartHoldings: React.FC<PieChartHoldingsProp> = ({ data }) => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      width: '100%'
    }}>
      <PieChart style={{ padding: 10 }} width={500} height={410}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          label
          outerRadius={130}
          fill="#8884d8"
          dataKey="currentValue"
          nameKey="symbol"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
      <div style={{ 
        marginTop: "-10px", // Pulls it closer to the chart if needed
        textAlign: 'center' 
      }}>
        <p style={{ 
          fontWeight: "600", 
          fontSize: "20px", 
          color: "#555",
          marginTop: 20 
        }}>
          Portfolio Holdings
        </p>
      </div>
    </div>
  );
};

export default PieChartHoldings;
