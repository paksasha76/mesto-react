import React from "react";

import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const ref = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: ref.current.value,
    });
  }

  React.useEffect(() => {
    ref.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      nameBtn="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            id="avatar-input"
            className="popup__input popup__input_type_avatar"
            type="url"
            ref={ref}
            name="avatar"
            placeholder="Ссылка на аватар"
            required
          />
          <span className="popup__input-error avatar-input-error"></span>
        </>
      }
    />
  );
}

export default EditAvatarPopup;
