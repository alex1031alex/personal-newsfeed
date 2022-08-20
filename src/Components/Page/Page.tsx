import React, { FC, useState } from "react";
import "./Page.css";
import { Navigation } from "../Navigation/Navigation";
import { Logo } from "../Logo/Logo";
import { ColorSchemeSwitcher } from "@components/ColorSchemeSwitcher/ColorSchemeSwitcher";
import { EmailModal } from "../EmailModal/EmailModal";

export const Page: FC = ({ children }) => {
  const [emailModalShown, setEmailModalShown] = useState(true);
  return (
    <React.Fragment>
      {emailModalShown && <EmailModal onClose={() => setEmailModalShown(false)}>Hello</EmailModal>}
      <header className="header">
        <div className="container header__container">
          <Logo />
          <Navigation className="header__navigation" />
          <div className="header__controls">
            <ColorSchemeSwitcher />
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="footer" id="footer">
        <div className="container">
          <div className="footer__top">
            <Logo />
            <Navigation className="footer__navigation" />
          </div>
          <div className="footer__bottom">
            Сделано на Frontend курсе в{" "}
            <a className="footer__link" href="https://karpov.courses/frontend" target="_blank" rel="noreferrer">
              Karpov.Courses
            </a>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};
