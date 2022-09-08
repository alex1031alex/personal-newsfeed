import React, { FC, useEffect, useRef } from "react";
import { applyScheme, getSavedScheme, getSystemScheme, removeSavedScheme } from "../../colorSchemeUtils";
import "./ColorSchemeSwitcher.css";
import { Auto } from "../Icons/Auto";
import { Sun } from "../Icons/Sun";
import { Moon } from "../Icons/Moon";
import { Dropdown } from "../Dropdown/Dropdown";

type ColorSchemeSwitcherValues = "auto" | "dark" | "light";

const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");

export const ColorSchemeSwitcher: FC = () => {
  const [userScheme, setUserScheme] = React.useState<ColorSchemeSwitcherValues>(getSavedScheme() || "auto");
  const [dropdownShown, setDropdownShown] = React.useState(false);
  const targetRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (userScheme === "auto") {
      removeSavedScheme();
      applyScheme(getSystemScheme());
    } else {
      applyScheme(userScheme, true);
    }
  }, [userScheme]);

  useEffect(() => {
    const systemColorSchemeListener = () => {
      if (userScheme === "auto") {
        applyScheme(getSystemScheme());
      }
    };

    matchMedia.addEventListener("change", systemColorSchemeListener);

    return () => {
      matchMedia.removeEventListener("change", systemColorSchemeListener);
    };
  }, [userScheme]);

  return (
    <div className="color-scheme-switcher">
      <button
        className="color-scheme-switcher__value"
        ref={targetRef}
        onClick={() => {
          setDropdownShown(!dropdownShown);
        }}
      >
        {userScheme === "auto" && <Auto />}
        {userScheme === "dark" && <Moon />}
        {userScheme === "light" && <Sun />}
      </button>
      <Dropdown targetRef={targetRef} shown={dropdownShown} onShownChange={setDropdownShown}>
        <button className="color-scheme-switcher__option" onClick={() => setUserScheme("auto")}>
          <Auto />
          <span className="color-scheme-switcher__text">Авто</span>
          {userScheme === "auto" && (
            <img
              className="color-scheme-switcher__check"
              src={require("../../images/check.svg")}
              alt="Выбранная тема"
            />
          )}
        </button>
        <button className="color-scheme-switcher__option" onClick={() => setUserScheme("light")}>
          <Sun />
          <span className="color-scheme-switcher__text">Светлая</span>
          {userScheme === "light" && (
            <img
              className="color-scheme-switcher__check"
              src={require("../../images/check.svg")}
              alt="Выбранная тема"
            />
          )}
        </button>
        <button className="color-scheme-switcher__option" onClick={() => setUserScheme("dark")}>
          <Moon />
          <span className="color-scheme-switcher__text">Темная</span>
          {userScheme === "dark" && (
            <img
              className="color-scheme-switcher__check"
              src={require("../../images/check.svg")}
              alt="Выбранная тема"
            />
          )}
        </button>
      </Dropdown>
    </div>
  );
};
