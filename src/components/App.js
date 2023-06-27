import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import React from "react";
import ImagePopup from "./ImagePopup.js";

function App() {
  const [editAvatar, setEditAvatar] = React.useState(false);
  const [editProfile, setEditProfile] = React.useState(false);
  const [addPlace, setAddPlace] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [isDeletePopup, setIsDeletePopup] = React.useState(false);

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleDeleteClick () {
    setIsDeletePopup(true);
  }

  function handleEditAvatarClick() {
    setEditAvatar(true);
  }
  function handleEditProfileClick() {
    setEditProfile(true);
  }
  function handleAddPlaceClick() {
    setAddPlace(true);
  }

  function closeAllPopups() {
    setEditAvatar(false);
    setEditProfile(false);
    setAddPlace(false);
    setSelectedCard(null);
    setIsDeletePopup(false);
  }

  return (
    <body className="root">
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardDelete ={handleDeleteClick }
        />
        <Footer />
        <PopupWithForm
          name="edit"
          title="Редактировать профиль"
          nameBtn="Сохранить"
          isOpen={editProfile}
          onClose={closeAllPopups} 
          children={
            <>
              <input
                id="name-input"
                className="popup__input popup__input_type_name"
                type="text"
                name="name"
                placeholder="Имя"
                minlength="2"
                maxlength="40"
                required
              />
              <span className="popup__input-error name-input-error"></span>
              <input
                id="profession-input"
                className="popup__input popup__input_type_profession"
                type="text"
                name="profession"
                placeholder="О себе"
                minlength="2"
                maxlength="200"
                required
              />
              <span className="popup__input-error profession-input-error"></span>
            </>
          }
        />
        <ImagePopup onClose={closeAllPopups} card={selectedCard}/>
        <PopupWithForm
          name="add"
          title="Новое место"
          nameBtn="Создать"
          isOpen={addPlace}
          onClose={closeAllPopups} 
          children={
            <>
              <input
                id="title-input"
                className="popup__input popup__input_type_title"
                type="text"
                name="name"
                placeholder="Название"
                minlength="2"
                maxlength="30"
                required
              />
              <span className="popup__input-error title-input-error"></span>
              <input
                id="link-input"
                className="popup__input popup__input_type_link"
                type="url"
                name="link"
                placeholder="Ссылка на карточку"
                required
              />
              <span className="popup__input-error link-input-error"></span>
            </>
          }
        />
        <PopupWithForm
          name="avatar"
          title="Обновить аватар"
          nameBtn="Сохранить"
          isOpen={editAvatar}
          onClose={closeAllPopups} 
          children={
            <>
              <input
                id="avatar-input"
                className="popup__input popup__input_type_avatar"
                type="url"
                name="avatar"
                placeholder="Ссылка на аватар"
                required
              />
              <span className="popup__input-error avatar-input-error"></span>
            </>
          }
        />
        <PopupWithForm name="confirm" title="Вы уверены?" nameBtn="Да" onClose={closeAllPopups}  isOpen={isDeletePopup}/>
      </div>

    </body>
  );
}

export default App;
