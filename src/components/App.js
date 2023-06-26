import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import React from "react";

function App() {
  const [editAvatar, setEditAvatar] = React.useState(false);
  const [editProfile, setEditProfile] = React.useState(false);
  const [addPlace, setAddPlace] = React.useState(false);
  function handleEditAvatarClick() {
    setEditAvatar(true);
  }
  function handleEditProfileClick() {
    setEditProfile(true);
  }
  function handleAddPlaceClick() {
    setAddPlace(true);
  }
  return (
    <body className="root">
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
        />
        <Footer />
        <PopupWithForm
          name="edit"
          title="Редактировать профиль"
          nameBtn="Сохранить"
          isOpen={editProfile}
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
      </div>


      <div className="popup popup_type_add">
        <div className="popup__content">
          <button className="popup__close-btn" type="button"></button>
          <h3 className="popup__title">Новое место</h3>
          <form
            className="popup__form popup__form_type_add"
            name="add-form"
            novalidate
          >
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
            <button className="popup__save-button" type="submit">
              Сохранить
            </button>
          </form>
        </div>
      </div>

      <div className="popup popup_type_view">
        <div className="popup__zoom-view">
          <button className="popup__close-btn" type="button"></button>
          <img className="popup__zoom-image" src="#" alt="Фото места" />
          <p className="popup__zoom-title"></p>
        </div>
      </div>

      <div className="popup popup_type_confirm">
        <div className="popup__content">
          <button className="popup__close-btn" type="button"></button>
          <h3 className="popup__title">Вы уверены?</h3>
          <button className="popup__yes-button" type="button">
            Да
          </button>
        </div>
      </div>

      <div className="popup popup_type_avatar">
        <div className="popup__content">
          <button className="popup__close-btn" type="button"></button>
          <h3 className="popup__title">Обновить аватар</h3>
          <form
            className="popup__form popup__form_type_avatar"
            name="avatar-form"
            novalidate
          >
            <input
              id="avatar-input"
              className="popup__input popup__input_type_avatar"
              type="url"
              name="avatar"
              placeholder="Ссылка на аватар"
              required
            />
            <span className="popup__input-error avatar-input-error"></span>
            <button className="popup__save-button" type="submit">
              Сохранить
            </button>
          </form>
        </div>
      </div>

      <template id="place-template">
        <li className="place">
          <img className="place__photo" src="#" alt="Фото карточки" />
          <button className="place__delete-button" type="button"></button>
          <div className="place__description">
            <h2 className="place__title"></h2>
            <div className="place__like-container">
              <button className="place__like" type="button"></button>
              <p className="place__like-counter">0</p>
            </div>
          </div>
        </li>
      </template>
    </body>
  );
}

export default App;
