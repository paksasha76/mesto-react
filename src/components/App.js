import React from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import AvatarEditPopup from "./EditAvatarPopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import PopupConfirm from "./PopupConfirm.js";
import PicturePopup from "./PicturePopup.js";
import api from "../utils/api.js";
import avatar from "../images/avatar.png";
import auth from "../utils/auth.js";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Register from "./Register.js";
import Login from "./Login.js";
import InfoTooltip from "./InfoTooltip.js";
import ProtectedRoute from "./ProtectedRoute.js";

function App() {
  const [currentUserData, setCurrentUserData] = React.useState({
    name: "Жак-Ив Кусто",
    about: "Исследователь океана",
    avatar: avatar,
  });

  React.useEffect(() => {
    handleTokenCheck();
  }, []);

  const [cardsData, setCardsData] = React.useState([]);

  React.useEffect(() => {
    api
      .getInitialData()
      .then((data) => {
        const [currentUserData, cardsData] = data;
        setCurrentUserData(currentUserData);
        setCardsData(cardsData);
      })
      .catch((err) => console.log("Ошибка: ", err));
  }, []);

  const [avatarFormReset, setAvatarFormReset] = React.useState(false);
  const [cardFormReset, setCardFormReset] = React.useState(false);

  const [headerBtnText, setHeaderBtnText] = React.useState("Регистрация");
  const [submitBtnText, setSubmitBtnText] = React.useState("Войти");

  function changeSubmitBtnText(text) {
    setSubmitBtnText(text);
  }

  const navigate = useNavigate();
  const location = useLocation();

  const [userEmail, setUserEmail] = React.useState("");
  const [userPwd, setUserPwd] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [infoTooltipOpened, setInfoTooltipOpened] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  function handleRegistration(email, password) {
    auth
      .registrate(email, password)
      .then(() => {
        setSuccess(true);
        setInfoTooltipOpened(true);
        setUserEmail(email);
        setUserPwd(password);
        navigate("/sign-in");
      })
      .catch((err) => {
        setSuccess(false);
        setInfoTooltipOpened(true);
        console.log("Ошибка: ", err);
      });
  }

  function handleTogglePage() {
    if (location.pathname === "/sign-in") {
      navigate("/sign-up");
      setHeaderBtnText("Вход");
      return;
    }
    navigate("/sign-in");
    setHeaderBtnText("Регистрация");
  }

  function handleLogOut() {
    localStorage.removeItem("jwt");
    setSubmitBtnText("Войти");
    setUserEmail("");
    setUserPwd("");
    setLoggedIn(false);
  }

  const [avatarEditPopupOpened, setAvatarEditPopupOpened] =
    React.useState(false);

  function handleAvatarBtnClick() {
    setSubmitBtnText("Сохранить");
    setAvatarEditPopupOpened(true);
  }

  const [profileEditPopupOpened, setEditProfilePopupOpened] =
    React.useState(false);

  function handleProfileBtnClick() {
    setSubmitBtnText("Сохранить");
    setEditProfilePopupOpened(true);
  }

  const [cardAddPopupOpened, setAddCardPopupOpened] = React.useState(false);

  function handleCardBtnClick() {
    setSubmitBtnText("Создать");
    setAddCardPopupOpened(true);
  }

  const [imagePopupOpened, setImagePopupOpened] = React.useState(false);

  const [clickPicture, setClickPicture] = React.useState({});

  function handleImageClick(cardData) {
    setClickPicture(cardData);
    setImagePopupOpened(true);
  }

  const [popupWithConfirmationOpened, setPopupWithConfirmationOpened] =
    React.useState(false);

  function handleDeleteCardClick(cardId) {
    setClickPicture(cardId);
    setSubmitBtnText("Да");
    setPopupWithConfirmationOpened(true);
  }

  function handleUpdateAvatar(link) {
    api
      .setAvatar(link)
      .then((data) => {
        setCurrentUserData(data);
        closeAllPopups();
        setAvatarFormReset(!avatarFormReset);
      })
      .catch((err) => {
        setSubmitBtnText("Ошибка. Попробуйте снова");
        console.log("Ошибка: ", err);
      });
  }

  function handleUpdateUser(name, description) {
    api
      .setUserInfo(name, description)
      .then((data) => {
        setCurrentUserData(data);
        closeAllPopups();
      })
      .catch((err) => {
        setSubmitBtnText("Ошибка. Попробуйте снова");
        console.log("Ошибка: ", err);
      });
  }

  function handleCardAdd(cardName, cardLink) {
    api
      .addNewCard(cardName, cardLink)
      .then((newCardData) => {
        setCardsData([newCardData, ...cardsData]);
        closeAllPopups();
        setCardFormReset(!cardFormReset);
      })
      .catch((err) => {
        setSubmitBtnText("Ошибка. Попробуйте снова");
        console.log("Ошибка: ", err);
      });
  }

  function handleDeleteCard(cardId) {
    api
      .deleteCard(cardId)
      .then(() => {
        setCardsData((cardsData) =>
          cardsData.filter((cardData) => cardData._id !== cardId)
        );
        closeAllPopups();
      })
      .catch((err) => {
        setSubmitBtnText("Ошибка. Попробуйте снова");
        console.log("Ошибка: ", err);
      });
  }

  function handleLikeClick(cardId, liked) {
    (liked ? api.deleteLike(cardId) : api.setLike(cardId))
      .then((newCardData) =>
        setCardsData(
          cardsData.map((cardData) =>
            cardData._id === cardId ? newCardData : cardData
          )
        )
      )
      .catch((err) => console.log("Ошибка: ", err));
  }

  function closeAllPopups() {
    setAvatarEditPopupOpened(false);
    setEditProfilePopupOpened(false);
    setAddCardPopupOpened(false);
    setPopupWithConfirmationOpened(false);
    setImagePopupOpened(false);
    setClickPicture({});
    setInfoTooltipOpened(false);
  }

  function handleTokenCheck() {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((data) => {
          setUserEmail(data.data.email);
          setLoggedIn(true);
          navigate("/");
        })
        .catch((err) => {
          setLoggedIn(false);
          console.log("Ошибка: ", err);
        });
    }
  }

  function handleLogIn(email, password) {
    auth
      .logIn(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setUserEmail(email);
        setLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        setLoggedIn(false);
        setSubmitBtnText("Ошибка. Попробуйте снова");
        console.log("Ошибка: ", err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUserData}>
      <div className="page">
        {}
        <Header
          loggedIn={loggedIn}
          userEmail={userEmail}
          btnText={headerBtnText}
          onTogglePage={handleTogglePage}
          onLogOut={handleLogOut}
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                cardsData={cardsData}
                onAvatarBtnClick={handleAvatarBtnClick}
                onProfileBtnClick={handleProfileBtnClick}
                onCardBtnClick={handleCardBtnClick}
                onImageClick={handleImageClick}
                onCardDelete={handleDeleteCardClick}
                onLikeClick={handleLikeClick}
                loggedIn={loggedIn}
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              <Register
                btnText="Зарегистрироваться"
                onTogglePage={handleTogglePage}
                onRegistration={handleRegistration}
              />
            }
          />
          <Route
            path="/sign-in"
            element={
              <Login
                btnText={submitBtnText}
                changeBtnText={changeSubmitBtnText}
                email={userEmail}
                password={userPwd}
                onLogIn={handleLogIn}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {}
        <Footer />

        {}
        <AvatarEditPopup
          btnText={submitBtnText}
          changeBtnText={changeSubmitBtnText}
          opened={avatarEditPopupOpened}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          reset={avatarFormReset}
        />

        {}
        <EditProfilePopup
          btnText={submitBtnText}
          changeBtnText={changeSubmitBtnText}
          opened={profileEditPopupOpened}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        {}
        <AddPlacePopup
          btnText={submitBtnText}
          changeBtnText={changeSubmitBtnText}
          opened={cardAddPopupOpened}
          onClose={closeAllPopups}
          onCardAdd={handleCardAdd}
          reset={cardFormReset}
        />

        {}
        <PopupConfirm
          btnText={submitBtnText}
          changeBtnText={changeSubmitBtnText}
          clickPicture={clickPicture}
          opened={popupWithConfirmationOpened}
          onClose={closeAllPopups}
          onCardDelete={handleDeleteCard}
        />

        {}
        <PicturePopup
          selectedCard={clickPicture}
          opened={imagePopupOpened}
          onClose={closeAllPopups}
        />

        {}
        <InfoTooltip
          success={success}
          opened={infoTooltipOpened}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
