import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card(props) {
  const currentUserData = React.useContext(CurrentUserContext);

  const owned = props.cardData.owner._id === currentUserData._id;

  const liked = props.cardData.likes.find(
    (like) => like._id === currentUserData._id
  );

  function handleClickImage() {
    props.onImageClick(props.cardData);
  }

  function handleClickDeleteCard() {
    props.onCardDelete(props.cardData._id);
  }

  function handleClickLike() {
    props.onLikeClick(props.cardData._id, liked);
  }

  return (
    <li className="element">
      <img
        className="element__image"
        src={`${props.cardData.link}`}
        alt={`Фото ${props.cardData.name}`}
        onClick={handleClickImage}
      />

      {owned && (
        <button
          className="element__trash-button"
          type="button"
          onClick={handleClickDeleteCard}
        ></button>
      )}

      <div className="element__caption">
        <h2 className="element__text">{props.cardData.name}</h2>
        <div className="element__group">
          <button
            className={`element__icon-button ${
              liked && "element__icon-button_active"
            }`}
            type="button"
            onClick={handleClickLike}
          ></button>
          <h2 className="element__counter">{props.cardData.likes.length}</h2>
        </div>
      </div>
    </li>
  );
}

export default Card;

