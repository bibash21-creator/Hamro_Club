"use client";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

export default function SearchBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async (value: string) => {
    setQuery(value);
    if (value.trim().length > 0) {
      try {
const res = await fetch(`http://localhost:8080/search?q=${value}`);        if (res.ok) {
          const data = await res.json();
          setResults(data);
        }
      } catch (err) {
        console.error("Search error:", err);
      }
    } else {
      setResults([]);
    }
  };

  return (
    <div className="relative">
      {/* Search button (always visible) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Search"
        className="flex items-center gap-2 bg-white dark:bg-[#121212] text-gray-500 rounded-full px-4 py-2 w-[50px] md:w-[240px] border"
      >
        <FaSearch className="text-gray-400" />
        <span className="hidden md:block text-sm">Search</span>
      </button>

      {/* Mobile input (appears below when toggled) */}
      {isOpen && (
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="block md:hidden mt-2 w-full border rounded-lg px-3 py-2 bg-white dark:bg-[#121212] text-gray-700 dark:text-gray-200"
        />
      )}

      {/* Desktop input (always visible inline) */}
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        className="hidden md:block absolute top-0 left-0 w-full h-full rounded-full border px-10 py-2 bg-white dark:bg-[#121212] text-gray-700 dark:text-gray-200 focus:outline-none"
      />

      {/* Results dropdown */}
      {results.length > 0 && (
        <div className="absolute mt-2 w-full bg-white dark:bg-[#121212] border rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {results.map((story) => (
            <div
              key={story.id}
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
            >
              <p className="font-semibold">{story.title}</p>
              <p className="text-sm text-gray-500">
                {story.content.slice(0, 50)}...
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}