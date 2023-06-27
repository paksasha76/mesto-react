import { api } from '../utils/Api';

import React from "react"

function Main(props) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()]).then(
      ([infoUser]) => {
        setUserAvatar(infoUser.avatar);
        setUserName(infoUser.name);
        setUserDescription(infoUser.about);
      }
    )
    .catch((error) => console.error(`Ошибка ${error}`))
  }, []);


    return ( <main className="content">
    <section className="profile">
      <div className="profile__avatar-edit">
        <img className="profile__avatar" src={userAvatar} alt="Фотография профиля" />
        <button className="profile__avatar-edit-button" type="button" onClick={props.onEditAvatar}></button>
      </div>
      <div className="profile__info">
        <div className="profile__edit">
          <h1 className="profile__name">{userName}</h1>
          <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
        </div>
        <p className="profile__profession">{userDescription}</p>
      </div>
      <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
    </section>

    <section className="cards">
      <ul className="cards__list"></ul>
    </section>
  </main>)
}

export default Main