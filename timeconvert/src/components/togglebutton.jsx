const ToggleButton = ({ toggleTheme, theme }) => {
  return (
    <button
      className="p-2 bg-zinc-950 text-white rounded-md w-20"
      onClick={toggleTheme}
    >
      {theme == "dark" ? "Light" : "Dark"}
    </button>
  );
};

export default ToggleButton;
