import React, { FC } from "react";
import "./Logo.css";
import { NavLink } from "react-router-dom";
//import logo from "/images/Logo.svg";

export const Logo: FC = () => {
  return (
    <NavLink to="/" className="logo">
      <img className="logo__image" src={"/images/Logo.svg"} alt="Логотип" />
    </NavLink>
  );
};
