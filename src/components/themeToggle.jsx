/* eslint-disable react/prop-types */

import lightIcon from "../assets/Sun.jpg";
import darkIcon from "../assets/Moon.jpg";

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="p-5 bg-white hover:scale-105 rounded mx-auto"
    >
      <img
        src={theme === "light" ? darkIcon : lightIcon}
        alt={theme === "light" ? "Change to dark" : "Change to light"}
      />
    </button>
  );
};

export default ThemeToggle;
