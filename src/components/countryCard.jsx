/* eslint-disable react/prop-types */
const CountryCard = ({ country, onClick }) => {
  return (
    <div
      className="shadow-xl mt-5 rounded-xl overflow-hidden cursor-pointer text-[#191013] bg-[#fcfcfc] hover:bg-[#f4f4f4] hover:scale-105"
      onClick={() => onClick(country.cca3)}
    >
      <img
        src={country.flags.png}
        alt={`Bandeira de ${country.name.common}`}
        className="w-full h-32 object-cover"
      />
      <div className="p-2 ">
        <h2 className="text-xl font-bold ">{country.name.common}</h2>
        <p className="text-md ">
          Capital: {country.capital ? country.capital[0] : "N/A"}
        </p>
        <p className="text-md ">Continent: {country.region}</p>
      </div>
    </div>
  );
};

export default CountryCard;
