import React, { HTMLAttributes, FC, useEffect } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";
import "./ModalWrapper.css";

interface ModalWrapperProps extends HTMLAttributes<HTMLElement> {
  alignX?: "start" | "center" | "end";
  alignY?: "start" | "center" | "end";
  onClose: VoidFunction;
}

export const ModalWrapper: FC<ModalWrapperProps> = ({
  children,
  alignX = "center",
  alignY = "center",
  className,
  onClose,
  ...restProps
}: ModalWrapperProps) => {
  useEffect(() => {
    document.documentElement.classList.add("--prevent-scroll");

    return () => {
      document.documentElement.classList.remove("--prevent-scroll");
    };
  }, []);

  useEffect(() => {
    const documentKeyDownListener = (evt: KeyboardEvent) => {
      if (evt.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", documentKeyDownListener);

    return () => {
      document.removeEventListener("keydown", documentKeyDownListener);
    };
  });

  return createPortal(
    <div
      className={classNames(
        "modal-wrapper",
        `modal-wrapper--alignX-${alignX}`,
        `modal-wrapper--alignY-${alignY}`,
        className
      )}
      onClick={onClose}
      {...restProps}
    >
      <div
        className="modal-wrapper__children"
        onClick={(evt) => evt.stopPropagation()}
        onKeyDown={(evt) => evt.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.getElementById("overlay") as HTMLElement
  );
};
