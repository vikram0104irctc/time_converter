import "./App.css";
import { Home } from "./components/home";
import { Navbar } from "./components/navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen bg-slate-200 dark:bg-zinc-800">
        <Home />
      </div>
    </>
  );
}

export default App;
