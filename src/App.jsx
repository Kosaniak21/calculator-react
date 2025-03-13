import { useState, useEffect } from "react";
import "./App.scss";
import { useTheme } from "./context/ThemeContext.jsx";

function App() {
  const { theme, toggleTheme } = useTheme();
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    setInput((prevInput) => prevInput + value);
  };

  const handleClear = () => {
    setInput("");
  };

  const handleEvaluate = () => {
    const divisionByZeroRegex = /\/0(?![\.0-9])/;

    if (divisionByZeroRegex.test(input)) {
      setInput("Error: Div by 0");
      return;
    }

    try {
      const result = eval(input).toString();
      localStorage.setItem("lastCalculation", result);
      setInput(result);
    } catch (error) {
      console.log(error);
      setInput("Error");
    }
  };

  const handleKeyPress = (event) => {
    const key = event.key;

    if (key >= "0" && key <= "9") {
      handleClick(key);
    } else if (key === "*" || key === "/") {
      handleClick(key);
    } else if (key === ".") {
      handleClick(key);
    } else if (key === "Enter") {
      handleEvaluate();
    } else if (key === "Backspace") {
      setInput(input.slice(0, -1));
    } else if (key === "Escape") {
      handleClear();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [input]);

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
    } else {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
    }
  }, [theme]);

  useEffect(() => {
    if (localStorage.getItem("lastCalculation")) {
      setInput(localStorage.getItem("lastCalculation"));
    }
  }, []);

  return (
    <>
      <button onClick={toggleTheme} className="theme-toggle-btn">
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>
      <div className="calculator">
        <div className="display">
          <input type="text" value={input} disabled />
        </div>
        <div className="buttons">
          <button className="button-number" onClick={() => handleClick("7")}>
            7
          </button>
          <button className="button-number" onClick={() => handleClick("8")}>
            8
          </button>
          <button className="button-number" onClick={() => handleClick("9")}>
            9
          </button>
          <button className="button-operation" onClick={() => handleClick("/")}>
            /
          </button>

          <button className="button-number" onClick={() => handleClick("4")}>
            4
          </button>
          <button className="button-number" onClick={() => handleClick("5")}>
            5
          </button>
          <button className="button-number" onClick={() => handleClick("6")}>
            6
          </button>
          <button className="button-operation" onClick={() => handleClick("*")}>
            *
          </button>

          <button className="button-number" onClick={() => handleClick("1")}>
            1
          </button>
          <button className="button-number" onClick={() => handleClick("2")}>
            2
          </button>
          <button className="button-number" onClick={() => handleClick("3")}>
            3
          </button>

          <button className="button-number" onClick={() => handleClick("0")}>
            0
          </button>
          <button className="button-number" onClick={() => handleClick(".")}>
            .
          </button>
          <button className="button-calculate" onClick={handleEvaluate}>
            =
          </button>

          <button className="clear" onClick={handleClear}>
            C
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
