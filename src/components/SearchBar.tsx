// Event typing
import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilterChange: (sector: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onFilterChange,
  placeholder = "Search stocks...",
}) => {
  const [query, setQuery] = useState("");

  // 1. ChangeEvent - typed to the specific HTML element
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  // 2. KeyboardEvent - access e.key safely
  const handdleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onSearch(query);
    if (e.key === "Excape") {
      setQuery("");
      onSearch("");
    }
  };

  // 3. MouseEvent - access e.currentTarget safely
  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setQuery("");
    onSearch("");
  };

  // 4. ChangeEvent for <select>
  const handleSectorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange(e.target.value);
  };

  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
      <input
        value={query}
        onChange={handleInputChange}
        onKeyDown={handdleKeyDown}
        placeholder={placeholder}
        style={{ display: "flex", padding: 8, borderRadius: 4 }}
      />

      <button onClick={handleClear}>Clear</button>
      <select onChange={handleSectorChange}>
        <option value="">All Sectors</option>
        <option value="Technology">Technology</option>
        <option value="Finance">Finance</option>
        <option value="Automotive">Automotive</option>
      </select>
    </div>
  );
};

export default SearchBar;
