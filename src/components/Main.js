import React from "react";

import Card from "./Card.js";

import {CurrentUserContext} from '../contexts/CurrentUserContext';


function Main(props) {
  const currentUser = React.useContext(CurrentUserContext)
    return ( <main className="content">
    <section className="profile">
      <div className="profile__avatar-edit">
        <img className="profile__avatar" src={currentUser.avatar} alt="Фотография профиля" />
        <button className="profile__avatar-edit-button" type="button" onClick={props.onEditAvatar}></button>
      </div>
      <div className="profile__info">
        <div className="profile__edit">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
        </div>
        <p className="profile__profession">{currentUser.about}</p>
      </div>
      <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
    </section>

    <section className="cards">
      <ul className="cards__list">
      {props.cards.map((data) => {
            return (
              <Card key={data._id} card={data} onCardLike={props.onCardLike} onCardClick={props.onCardClick} onCardDelete={props.onCardDelete} />
          );
        })}
      </ul>
    </section>
  </main>)
}

export default Main