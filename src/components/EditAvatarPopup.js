import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm.js";

function AvatarEditPopup(props) {
  const avatarLink = React.useRef("");

  function handleSubmit(event) {
    event.preventDefault();
    props.changeBtnText("Сохранение...");
    props.onUpdateAvatar(avatarLink.current.value);
  }

  useEffect(() => {
    avatarLink.current.value = "";
  }, [props.reset]);

  return (
    <PopupWithForm
      type="avatar"
      formTitle="Обновить аватар"
      btnText={props.btnText}
      opened={props.opened}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      {}
      <input
        className="form__field form__field_type_avatarlink"
        type="url"
        placeholder="Ссылка на аватар"
        name="avatarLink"
        ref={avatarLink}
        autoFocus
        required
      />
      <span className="form__error-message" id="avatarLink-error"></span>
    </PopupWithForm>
  );
}
export default AvatarEditPopup;
