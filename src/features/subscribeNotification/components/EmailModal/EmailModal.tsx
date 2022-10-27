import React, { FC, useState } from "react";
import { ModalWrapper } from "@components/ModalWrapper/ModalWrapper";
import { Button } from "@components/Button/Button";
import "./EmailModal.css";

interface EmailModalProps {
  onClose: VoidFunction;
  shown: boolean;
}

export const EmailModal: FC<EmailModalProps> = ({ onClose, shown }: EmailModalProps) => {
  const [sending, setSending] = useState(false);

  const _onClose = () => {
    if (!sending) {
      onClose();
    }
  };

  return (
    <ModalWrapper shown={shown} onClose={_onClose}>
      <div className="email-modal">
        <h2 className="email-modal__title">
          Хотите получать последние новости от{" "}
          <a className="email-modal__link" href="#">
            Karpov.Cources?
          </a>
        </h2>
        <p className="email-modal__text">Оставьте свой e-mail и будем на связи!</p>
        <form
          className="email-modal__form"
          onSubmit={(evt) => {
            evt.preventDefault();
            setSending(true);
            fetch("http://frontend.karpovcourses.net/api/v2/subscribe")
              .then(() => {
                setSending(false);
                onClose();
              })
              .catch(() => setSending(false));
          }}
        >
          <input type="email" required className="email-modal__input" placeholder="Введите вашу почту" />
          <Button type="submit" loading={sending}>
            Подписаться
          </Button>
        </form>
        <button className="email-modal__close" type="button" onClick={_onClose}>
          <img src={require("../../../../images/cross-24.svg")} alt="Закрытие модального окна" />
        </button>
      </div>
    </ModalWrapper>
  );
};
