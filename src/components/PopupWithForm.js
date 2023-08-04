import Popup from "./Popup.js";

function PopupWithForm(props) {
  return (
    <Popup opened={props.opened} type={props.type} onClose={props.onClose}>
      <form
        className={`form form_type_${props.type}`}
        name={`${props.type}Form`}
        onSubmit={props.onSubmit}
      >
        <h2 className="form__title">{props.formTitle}</h2>

        {}
        {props.children}

        <button
          className="form__submit-button"
          type="submit"
          aria-label="кнопка cохранения"
        >
          {props.btnText}
        </button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;
