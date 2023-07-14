import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        if (props.isOpen) {
          setName(currentUser.name);
          setDescription(currentUser.about);
        }
      }, 
     [currentUser, props.isOpen]
    )

    function handleNameChange(event) {
        setName(event.target.value);
      }
    
      function handleDescriptionChange(event) {
        setDescription(event.target.value);
      }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
          name,
          profession: description,
        });
      }
    

    return ( <PopupWithForm
        name="edit"
        title="Редактировать профиль"
        nameBtn="Сохранить"
        isOpen={props.isOpen}
        onSubmit={handleSubmit}
        onClose={props.onClose} 
        children={
          <>
            <input
              id="name-input"
              className="popup__input popup__input_type_name"
              type="text"
              name="name"
              placeholder="Имя"
              minLength="2"
              maxLength="40"
              required
              value={name}
              onChange={handleNameChange}
            />
            <span className="popup__input-error name-input-error"></span>
            <input
              id="profession-input"
              className="popup__input popup__input_type_profession"
              type="text"
              name="profession"
              placeholder="О себе"
              minLength="2"
              maxLength="200"
              required
              value={description}
              onChange={handleDescriptionChange}
            />
            <span className="popup__input-error profession-input-error"></span>
          </>
        }
      />)
}

export default EditProfilePopup;