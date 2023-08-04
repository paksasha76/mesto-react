import React from "react";
import Popup from "./Popup.js";
import successImage from "../images/success.svg";
import failureImage from "../images/failure.svg";

function InfoTooltip(props) {
  return (
    <Popup opened={props.opened} type="reginfo" onClose={props.onClose}>
      <div className="form">
        <img
          className="form__reg-icon"
          src={props.success ? successImage : failureImage}
          alt={props.success ? "Регистрация успешна!" : "Ошибка регистрации"}
        />
        <p className="form__reg-message">
          {props.success
            ? "Вы успешно зарегистрировались !"
            : "Что-то пошло не так ! Попробуйте ещё раз."}
        </p>
      </div>
    </Popup>
  );
}

export default InfoTooltip;
