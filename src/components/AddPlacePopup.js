import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup(props) {
  const [cardTitle, setCardTitle] = React.useState("");
  const [cardLink, setCardLink] = React.useState("");

  function handleSetTitle(event) {
    setCardTitle(event.target.value);
  }

  function handleSetLink(event) {
    setCardLink(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.changeBtnText("Сохранение...");
    props.onCardAdd(cardTitle, cardLink);
  }

  React.useEffect(() => {
    setCardTitle("");
    setCardLink("");
  }, [props.reset]);

  return (
    <PopupWithForm
      type={"card"}
      formTitle="Новое место"
      btnText={props.btnText}
      opened={props.opened}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      {}
      <input
        className="form__field form__field_type_cardname"
        type="text"
        placeholder="Название"
        name="cardName"
        minLength="2"
        maxLength="30"
        value={cardTitle}
        onChange={handleSetTitle}
        autoFocus
        required
      />
      <span className="form__error-message" id="cardName-error"></span>
      <input
        className="form__field form__field_type_cardlink"
        type="url"
        placeholder="Ссылка на картинку"
        name="cardLink"
        value={cardLink}
        onChange={handleSetLink}
        required
      />
      <span className="form__error-message" id="cardLink-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
