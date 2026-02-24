// Generic Components

import { useState } from "react";

type SortDir = "asc" | "desc" | null;

interface SortState<T> {
  key: keyof T | null;
  dir: SortDir;
}

// Column definition is also generic
interface Column<T> {
  key: keyof T; // must be a real key of T
  header: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  width?: number;
  sortable?: boolean;
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
  const [sort, setSort] = useState<SortState<T>>({ key: null, dir: null });

  const handleSort = (key: keyof T) => {
    setSort((prev) => ({
      key,
      dir: prev.key === key && prev.dir === "asc" ? "desc" : "asc",
    }));
  };

  const sorted = [...data].sort((a, b) => {
    if (!sort.key || !sort.dir) return 0;
    const av = a[sort.key],
      bv = b[sort.key];
    if (av < bv) return sort.dir === "asc" ? -1 : 1;
    if (av > bv) return sort.dir === "asc" ? 1 : -1;
    return 0;
  });
  if (DataTable.length === 0) return <p>{emptyMessage}</p>;

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      {/* <thead>
        <tr style={{ backgroundColor: "#1E3A8A", color: "#fff" }}>
          {columns.map((col) => (
            <th key={String(col.key)} style={{ padding: 8, textAlign: "left" }}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead> */}
      <thead>
        <tr style={{ backgroundColor: "#1E3A8A", color: "#fff" }}>
          {columns.map((col) => (
            <th
              key={String(col.key)}
              onClick={() => col.sortable && handleSort(col.key)}
            >
              {col.header}
              {col.sortable && sort.key === col.key ? sort.dir === "asc" ? "  ▲" : "  ▼" : col.sortable ? "  ⇅": ""}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {/* {data.map((row, ri) => ( */}
        {sorted.map((row, ri) => (
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
