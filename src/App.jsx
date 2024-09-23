import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CountryCard from "./components/CountryCard";
import FilterPanel from "./components/filterPanel";
import ThemeToggle from "./components/ThemeToggle";
import Loading from "./components/Loading";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRegion, setFilterRegion] = useState("");
  const [filterSubRegion, setFilterSubRegion] = useState("");
  const [filterPopulation, setFilterPopulation] = useState("");
  const [sortOrder, setSortOrder] = useState({
    field: "name",
    direction: "asc",
  });
  const [visibleCountries, setVisibleCountries] = useState(20);
  const [theme, setTheme] = useState("light");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchCountries = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      setCountries(response.data);
    } catch (error) {
      console.error("Erro ao buscar países:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    setVisibleCountries((prevVisible) => prevVisible + 20);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredCountries = countries
    .filter((country) =>
      country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((country) =>
      filterRegion ? country.region === filterRegion : true
    )
    .filter((country) =>
      filterSubRegion ? country.subregion === filterSubRegion : true
    )
    .filter((country) => {
      if (!filterPopulation) return true;
      const population = country.population;
      switch (filterPopulation) {
        case "<1M":
          return population < 1000000;
        case "1M-10M":
          return population >= 1000000 && population <= 10000000;
        case "10M-100M":
          return population > 10000000 && population <= 100000000;
        case ">100M":
          return population > 100000000;
        default:
          return true;
      }
    })
    .sort((a, b) => {
      const field = sortOrder.field;
      if (field === "population" || field === "area") {
        return sortOrder.direction === "asc"
          ? a[field] - b[field]
          : b[field] - a[field];
      }
      return sortOrder.direction === "asc"
        ? a.name.common.localeCompare(b.name.common)
        : b.name.common.localeCompare(a.name.common);
    })
    .slice(0, visibleCountries);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleCardClick = (cca3) => {
    setLoading(true);
    navigate(`/country/${cca3}`, { state: { theme } });
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  return (
    <div
      className={`${
        theme === "light" ? "bg-[#5b88a5] text-[#191013]" : "bg-[#243a69] "
      } min-h-screen`}
    >
      <header
        className="fixed w-full bg-[#f4f4f2] text-[#191013] shadow-md z-10 p-4"
        style={{ top: 0 }}
      >
        <h1 className="text-center text-4xl font-extrabold animate-bounce">
          Country Explorer
        </h1>
      </header>

      <div className="pt-28 max-w-7xl mx-auto">
        <div className="flex mb-4">
          <FilterPanel
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filterRegion={filterRegion}
            setFilterRegion={setFilterRegion}
            filterSubRegion={filterSubRegion}
            setFilterSubRegion={setFilterSubRegion}
            filterPopulation={filterPopulation}
            setFilterPopulation={setFilterPopulation}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-between">
          {loading ? (
            <Loading />
          ) : (
            filteredCountries.map((country) => (
              <CountryCard
                key={country.cca3}
                country={country}
                onClick={handleCardClick}
              />
            ))
          )}
        </section>

        {visibleCountries >= countries.length && (
          <div className="text-center py-6">
            <p>All countries loaded.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
