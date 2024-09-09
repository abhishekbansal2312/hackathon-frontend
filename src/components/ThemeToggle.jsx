import React, { useContext } from "react";
import ReactSwitch from "react-switch";
import { ThemeContext } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="theme-toggle-container">
      <ReactSwitch
        checked={theme === "dark"}
        onChange={toggleTheme}
        offColor="#ccc"
        onColor="#333"
        offHandleColor="#fff"
        onHandleColor="#fff"
        handleDiameter={20}
        uncheckedIcon={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              paddingRight: 10,
            }}>
            <span></span>
          </div>
        }
        checkedIcon={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              paddingRight: 10,
            }}>
            <span></span>
          </div>
        }
        height={20}
        width={48}
        className="react-switch"
      />
    </div>
  );
};

export default ThemeToggle;
