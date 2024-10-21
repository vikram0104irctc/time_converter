import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Navbar } from "./navbar";

export const Home = () => {
  const [currtime, setCurrtime] = useState("");
  const [addItems, setAddItems] = useState(
    localStorage.getItem("items")
      ? JSON.parse(localStorage.getItem("items"))
      : []
  );
  const parentRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      const hour = date.getHours();
      const min = date.getMinutes();
      const second = date.getSeconds();
      const flag = hour >= 12;
      const adjustedHour = flag ? hour - 12 : hour === 0 ? 12 : hour;

      const time = `${adjustedHour}-${min < 10 ? "0" + min : min}-${
        second < 10 ? "0" + second : second
      } ${flag ? "pm" : "am"}`;
      setCurrtime(time);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleAddItem = (country, timezone) => {
    const currentTimeInZone = () => {
      const date = new Date().toLocaleString("en-US", { timeZone: timezone });
      const formattedDate = new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      const time = new Date(date).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      return { time, formattedDate };
    };

    setAddItems((prevItems) => [
      ...prevItems,
      { country, timezone, ...currentTimeInZone() },
    ]);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setAddItems((prevItems) =>
        prevItems.map((item) => {
          const date = new Date().toLocaleString("en-US", {
            timeZone: item.timezone,
          });
          const time = new Date(date).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });
          const formattedDate = new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });
          return { ...item, time, formattedDate };
        })
      );
      setTimeout(() => {
        localStorage.setItem("items", JSON.stringify(addItems));
      }, 500);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [addItems]);

  function handleDelte(country) {
    let nitems = addItems.filter((ele) => {
      return ele.country !== country;
    });
    setAddItems(nitems);
    localStorage.setItem("items", JSON.stringify(nitems));
  }

  return (
    <div ref={parentRef} className="max-w-[1360px] m-auto pt-[80px]">
      <Navbar handleAddItem={handleAddItem} />
      <motion.div
        drag
        dragConstraints={parentRef}
        className="w-[80%] bg-slate-800 text-white rounded-md dark:bg-black p-4 m-auto shadow-lg grid grid-cols-3 mb-2"
      >
        <p>India</p>
        <p className="text-center">Time: {currtime}</p>
        <p className="text-end">
          Date:{" "}
          {new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </p>
      </motion.div>
      {addItems.length > 0 &&
        addItems.map((ele, index) => (
          <motion.div
            key={index}
            drag
            dragConstraints={parentRef}
            className="w-[80%] bg-slate-800 text-white rounded-md dark:bg-black p-4 m-auto shadow-lg grid grid-cols-3 mb-2"
          >
            <p>{ele.country}</p>
            <p className="text-center">Time: {ele.time}</p>
            <p className="text-end">
              Date: {ele.formattedDate}{" "}
              <span
                onClick={() => handleDelte(ele.country)}
                className="ml-2 cursor-pointer"
              >
                ⨯
              </span>
            </p>
          </motion.div>
        ))}
    </div>
  );
};
