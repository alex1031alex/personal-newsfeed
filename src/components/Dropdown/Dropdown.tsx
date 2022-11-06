import React, { FC, HTMLAttributes, RefObject, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import throttle from "lodash.throttle";
import "./Dropdown.css";
import classNames from "classnames";
import { CSSTransition } from "react-transition-group";

interface DropdownProps extends HTMLAttributes<HTMLElement> {
  targetRef: RefObject<HTMLElement>;
  shown: boolean;
  onShownChange: (shown: boolean) => void;
}

const calcCoords = (targetElement: HTMLElement) => {
  const rect = targetElement.getBoundingClientRect();

  return {
    top: window.scrollY + rect.bottom + 12,
    right: window.innerWidth - rect.right - window.scrollX,
  };
};

export const Dropdown: FC<DropdownProps> = ({
  targetRef,
  style,
  className,
  shown,
  onShownChange,
  children,
  ...restProps
}) => {
  const [coords, setCoords] = useState({ top: 0, right: 0 });
  useEffect(() => {
    setCoords(calcCoords(targetRef.current as HTMLElement));
  }, []);

  useEffect(() => {
    onShownChange(shown);
  }, [shown, onShownChange]);

  useEffect(() => {
    const documentClickListener = () => {
      onShownChange(false);
    };

    const windowResizeListener = throttle(() => {
      setCoords(calcCoords(targetRef.current as HTMLElement));
    }, 100);

    if (shown) {
      document.addEventListener("click", documentClickListener);
      window.addEventListener("resize", windowResizeListener);
    }

    return () => {
      document.removeEventListener("click", documentClickListener);
      window.removeEventListener("resize", windowResizeListener);
    };
  }, [onShownChange, shown]);

  return createPortal(
    <CSSTransition in={shown} timeout={200} mountOnEnter={true} unmountOnExit={true} classNames="dropdown-animation">
      <div {...restProps} style={{ ...style, ...coords }} className={classNames("dropdown", className)}>
        {children}
      </div>
    </CSSTransition>,
    document.getElementById("overlay") as HTMLElement
  );
};
