import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const CountryDetail = () => {
  const { countryCode } = useParams();
  const [country, setCountry] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [theme, setTheme] = useState(location.state?.theme || "light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }

    const fetchCountry = async () => {
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/alpha/${countryCode}`
        );
        setCountry(response.data[0]);
      } catch (error) {
        console.error("Erro ao buscar país:", error);
      }
    };
    fetchCountry();
  }, [countryCode]);

  if (!country) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={`${
        theme === "light" ? "bg-[#5b88a5] text-[#191013]" : "bg-[#243a69]"
      } min-h-screen p-4`}
    >
      <button
        onClick={() => navigate("/")}
        className="mb-4 px-4 py-2 bg-[#f4f4f2] text-black hover:bg-[#808080] hover:text-[#f4f4f2] hover:scale-105 rounded text-xl "
      >
        ←
      </button>
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="w-full flex items-center">
          <img
            src={country.flags.png}
            alt={`Bandeira de ${country.name.common}`}
            className=" mb-5 mr-11 shadow-lg"
          />
          <h1 className="text-3xl font-bold mb-5">{country.name.official}</h1>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-lg">
              <strong>Capital:</strong>{" "}
              {country.capital ? country.capital[0] : "N/A"}
            </p>
            <p className="text-lg">
              <strong>Continent:</strong> {country.region}
            </p>
            <p className="text-lg">
              <strong>Subcontinent:</strong> {country.subregion}
            </p>
            <p className="text-lg">
              <strong>Population:</strong> {country.population.toLocaleString()}
            </p>
            <p className="text-lg">
              <strong>Area:</strong> {country.area.toLocaleString()} km²
            </p>
          </div>
          <div>
            <p className="text-lg">
              <strong>Language:</strong>{" "}
              {Object.values(country.languages).join(", ")}
            </p>
            <p className="text-lg">
              <strong>Currency:</strong>{" "}
              {Object.values(country.currencies)
                .map((curr) => curr.name)
                .join(", ")}
            </p>
            <p className="text-lg">
              <strong>Time Zone:</strong> {country.timezones.join(", ")}
            </p>
            <p className="text-lg">
              <strong>Internet Domain:</strong> {country.tld.join(", ")}
            </p>
            <p className="text-lg">
              <strong>Dialing Code:</strong> +{country.idd.root}
              {country.idd.suffixes[0]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
