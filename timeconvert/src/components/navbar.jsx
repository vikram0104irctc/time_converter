import React, { useState, useEffect } from "react";
import ToggleButton from "./togglebutton";

export const Navbar = ({ handleAddItem }) => {
  const countryTimeZones = {
    Canada: "America/Toronto",
    Brazil: "America/Sao_Paulo",
    Germany: "Europe/Berlin",
    France: "Europe/Paris",
    India: "Asia/Kolkata",
    China: "Asia/Shanghai",
    Japan: "Asia/Tokyo",
    Australia: "Australia/Sydney",
    Russia: "Europe/Moscow",
    Mexico: "America/Mexico_City",
    Argentina: "America/Argentina/Buenos_Aires",
    Turkey: "Europe/Istanbul",
    Nigeria: "Africa/Lagos",
    Egypt: "Africa/Cairo",
    Italy: "Europe/Rome",
    Spain: "Europe/Madrid",
  };
  let [search, setSearch] = useState("");
  const [theme, setTheme] = useState(
    localStorage.getItem("theme")
      ? JSON.parse(localStorage.getItem("theme"))
      : "light"
  );
  const [currdate, setCurrdate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [suggestion, setSuggestion] = useState([]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    localStorage.setItem(
      "theme",
      JSON.stringify(theme === "light" ? "dark" : "light")
    );
  };

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const handleSearchedInput = (e) => {
    setSearch(e.target.value);
    if (search.length > 1) {
      const suggestions = Object.keys(countryTimeZones).filter((key) =>
        key.toLowerCase().includes(search.toLowerCase())
      );
      setSuggestion(suggestions);
    } else {
      setSuggestion([]);
    }
  };

  const handleSelectCountry = (country) => {
    const timezone = countryTimeZones[country];
    handleAddItem(country, timezone);
    setSuggestion([]);
    setSearch("");
  };

  return (
    <div className="w-full fixed top-0 left-0 bg-slate-300 dark:bg-zinc-900">
      <div className="max-w-[1360px] m-auto p-3 flex justify-between items-center">
        <div className="relative">
          <input
            value={search}
            type="text"
            placeholder="Add Time Zone, City or Town"
            className="w-60 p-[5px] rounded-md outline-none bg-slate-200 placeholder:text-zinc-950 placeholder:text-sm"
            onInput={handleSearchedInput}
          />
          <ul className="absolute top-14 ">
            {suggestion.length > 0
              ? suggestion.map((ele) => (
                  <li
                    key={ele}
                    className="p-[5px] w-60 cursor-pointer bg-slate-800 dark:hover:bg-zinc-700 shadow-lg rounded-md text-white mb-1"
                    onClick={() => handleSelectCountry(ele)}
                  >
                    {ele}
                  </li>
                ))
              : ""}
          </ul>
        </div>
        <div>
          <input
            type="date"
            value={currdate}
            onChange={(e) => setCurrdate(e.target.value)}
            className="w-40 p-[5px] rounded-md outline-none bg-slate-200 placeholder:text-zinc-950"
          />
        </div>
        <div>
          <ToggleButton toggleTheme={toggleTheme} theme={theme} />
        </div>
      </div>
    </div>
  );
};
