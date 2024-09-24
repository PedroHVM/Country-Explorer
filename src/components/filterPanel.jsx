/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";

const FilterPanel = ({
  searchQuery,
  setSearchQuery,
  filterRegion,
  setFilterRegion,
  filterSubRegion,
  setFilterSubRegion,
  filterPopulation,
  setFilterPopulation,
  sortOrder,
  setSortOrder,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null); // Cria uma referência para o menu

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Função para resetar os filtros
  const resetFilters = () => {
    setSearchQuery("");
    setFilterRegion("");
    setFilterSubRegion("");
    setFilterPopulation("");
    setSortOrder({ field: "name", direction: "asc" });
  };

  // Função para fechar o menu ao clicar fora
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="max-w-7xl flex items-center gap-1 mx-auto">
      <input
        type="text"
        placeholder="Search country..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border border-gray-300 rounded p-2 shadow-md"
      />
      <button
        onClick={toggleMenu}
        className="bg-[#f4f4f2] text-[#191013] hover:bg-[#808080] hover:text-[#f4f4f2] font-semibold py-2 px-4 rounded-lg shadow-md"
      >
        Filter
      </button>
      {isMenuOpen && (
        <div
          ref={menuRef} // Adiciona a referência ao menu
          className="absolute top-12 left-0 bg-white border border-gray-300 shadow-lg rounded-lg w-64 z-50 p-4"
        >
          <select
            value={filterRegion}
            onChange={(e) => setFilterRegion(e.target.value)}
            className="border border-gray-300 rounded p-2 shadow-md w-full mb-2"
          >
            <option value="">All Regions</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
          <select
            value={filterSubRegion}
            onChange={(e) => setFilterSubRegion(e.target.value)}
            className="border border-gray-300 rounded p-2 shadow-md w-full mb-2"
          >
            <option value="">All Subregions</option>
            <option value="Northern Africa">Northern Africa</option>
            <option value="Central Asia">Central Asia</option>
            <option value="Eastern Asia">Eastern Asia</option>
            <option value="Southern Asia">Southern Asia</option>
            <option value="Western Asia">Western Asia</option>
            <option value="Eastern Europe">Eastern Europe</option>
            <option value="Northern Europe">Northern Europe</option>
            <option value="Southern Europe">Southern Europe</option>
            <option value="Western Europe">Western Europe</option>
            <option value="Caribbean">Caribbean</option>
            <option value="Central America">Central America</option>
            <option value="North America">North America</option>
            <option value="South America">South America</option>
            <option value="Australia and New Zealand">Oceania</option>
            <option value="Melanesia">Melanesia</option>
            <option value="Micronesia">Micronesia</option>
            <option value="Polynesia">Polynesia</option>
          </select>
          <select
            value={filterPopulation}
            onChange={(e) => setFilterPopulation(e.target.value)}
            className="border border-gray-300 rounded p-2 shadow-md w-full mb-2"
          >
            <option value="">Population</option>
            <option value="<1M">Less than 1M</option>
            <option value="1M-10M">1M - 10M</option>
            <option value="10M-100M">10M - 100M</option>
            <option value=">100M">More than 100M</option>
          </select>

          <select
            onChange={(e) => {
              const [field, direction] = e.target.value.split("|");
              setSortOrder({
                field,
                direction,
              });
            }}
            className="border border-gray-300 rounded p-2 shadow-md w-full mb-2"
          >
            <option value="name|asc">Order by A-Z</option>
            <option value="name|desc">Order by Z-A</option>
            <option value="population|desc">Order by Highest population</option>
            <option value="population|asc">Order by lowest population</option>
            <option value="area|desc">Order by biggest area</option>
            <option value="area|asc">Order by smallest area</option>
          </select>

          {/* Botão de resetar filtros */}
          <button
            onClick={resetFilters}
            className="mt-4 bg-red-500 text-white font-semibold py-2 px-4 w-full rounded-lg shadow-md hover:bg-red-600"
          >
            Reset Filter
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
