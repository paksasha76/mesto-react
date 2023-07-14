import Header from "./Header.js";
import {api} from "../utils/Api.js"
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import React from "react";
import ImagePopup from "./ImagePopup.js";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";

function App() {
  const [editAvatar, setEditAvatar] = React.useState(false);
  const [editProfile, setEditProfile] = React.useState(false);
  const [addPlace, setAddPlace] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [isDeletePopup, setIsDeletePopup] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([])

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()]).then(
      ([infoUser, infoCard]) => {
        setCurrentUser(infoUser)
        setCards(infoCard)
      }
    )
    .catch((error) => console.error(`Ошибка ${error}`))
  }, []);

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


  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((items) => items.filter((c) => c._id !== card._id && c));
    }).catch((err) => {
      console.error(err);
    });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (!isLiked) {
      api.addCardLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      }).catch((err) => {
        console.error(err);
      });
    } else {
      api.deleteCardLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      }).catch((err) => {
        console.error(err);
      });
    }
  }


  function handleUpdateUser(data) {
    api.editUserInfo(data).then((newUser) => {
      setCurrentUser(newUser);
      closeAllPopups();
    }).catch((err) => {
      console.error(err);
    });
  }
  
  function handleUpdateAvatar(data) {
    api.editAvatarUser(data).then((newAvatar) => {
      setCurrentUser(newAvatar);
      closeAllPopups();
    }).catch((err) => {
      console.error(err);
    });
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
    <body className="root">
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardDelete ={handleDeleteClick}
          onCardLike={handleCardLike}
          cards={cards}
        />
        <EditProfilePopup  isOpen={editProfile}
        onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
        <Footer />
       
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
         <EditAvatarPopup  isOpen={editAvatar} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
        <PopupWithForm name="confirm" title="Вы уверены?" nameBtn="Да" onClose={closeAllPopups}  isOpen={isDeletePopup} onCardDelete={handleCardDelete}/>
      </div>

    </body>
    </CurrentUserContext.Provider>
  );
}

export default App;
