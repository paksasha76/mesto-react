import Header from "./Header.js";
import {api} from "../utils/Api.js"
import Main from "./Main.js";
import Footer from "./Footer.js";
import React from "react";
import ImagePopup from "./ImagePopup.js";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";

function App() {
  const [editAvatar, setEditAvatar] = React.useState(false);
  const [editProfile, setEditProfile] = React.useState(false);
  const [addPlace, setAddPlace] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
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

  function handleAddPlaceSubmit(data) {
    api.addCard(data).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    }).catch((err) => {
      console.error(err);
    });
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="root">
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardDelete ={handleCardDelete}
          onCardLike={handleCardLike}
          cards={cards}
        />
        <EditProfilePopup  isOpen={editProfile}
        onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
        <Footer />
       
        <ImagePopup onClose={closeAllPopups} card={selectedCard}/>
        <AddPlacePopup  isOpen={addPlace} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
         <EditAvatarPopup  isOpen={editAvatar} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
   
      </div>

    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
