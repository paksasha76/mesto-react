import {CurrentUserContext} from '../contexts/CurrentUserContext';
import React from "react"

export default function Card({ card, onCardClick, onCardDelete, onCardLike }) {
  const currentUser = React.useContext(CurrentUserContext)
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `place__like ${
    isLiked && "place__like_active"
  }`;

  function handleClick() {
    onCardClick(card)
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }

  return (
    <li className="place">
      <img
        className="place__photo"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      {isOwn && (
        <button
          className="place__delete-button"
          type="button"
          onClick={handleDeleteClick}
        >
          {" "}
        </button>
      )}
      <div className="place__description">
        <h2 className="place__title">{card.name}</h2>
        <div className="place__like-container">
          <button onClick={handleLikeClick} className={cardLikeButtonClassName} type="button"></button>
          <p className="place__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}
