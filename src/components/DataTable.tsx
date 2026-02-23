// Generic Components

// Column definition is also generic
interface Column<T> {
  key: keyof T; // must be a real key of T
  header: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  width?: number;
}

// 2. Generic Props - T extends object keeps things safe
interface DataTableProps<T extends object> {
  data: T[];
  columns: Column<T>[];
  rowKey: keyof T; // which key is unique key
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
}

// 3. Generic component - not the <T extends object> on the arrow function
function DataTable<T extends object>({
  data,
  columns,
  rowKey,
  onRowClick,
  emptyMessage = "No data found.",
}: DataTableProps<T>) {
  if (DataTable.length === 0) return <p>{emptyMessage}</p>;

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ backgroundColor: "#1E3A8A", color: "#fff" }}>
          {columns.map((col) => (
            <th key={String(col.key)} style={{ padding: 8, textAlign: "left" }}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, ri) => (
          <tr
            key={String(row[rowKey])}
            onClick={() => onRowClick?.(row)}
            style={{
              backgroundColor: ri % 2 === 0 ? "#fff" : "#F8FAFC",
              cursor: onRowClick ? "pointer" : "default",
            }}
          >
            {columns.map((col) => (
              <td key={String(col.key)} style={{ padding: 8 }}>
                {col.render
                  ? col.render(row[col.key], row)
                  : String(row[col.key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default DataTable;