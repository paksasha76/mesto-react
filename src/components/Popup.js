import React from "react";

function Popup(props) {
  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        props.onClose();
      }
    }

    if (props.opened) {
      document.addEventListener("keydown", closeByEscape);
      return function () {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [props.opened, props]);

  function closeByOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      props.onClose();
    }
  }

  return (
    <div
      className={`popup popup_type_${props.type} ${
        props.opened && "popup_opened"
      }`}
      onClick={closeByOverlayClick}
    >
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          aria-label="кнопка Закрыть"
          onClick={props.onClose}
        ></button>

        {}
        {props.children}
      </div>
    </div>
  );
}

export default Popup;
