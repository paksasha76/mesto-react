import { api } from '../utils/Api';

function Main(props) {
    return ( <main className="content">
    <section className="profile">
      <div className="profile__avatar-edit">
        <img className="profile__avatar" src="#" alt="Фотография профиля" />
        <button className="profile__avatar-edit-button" type="button" onClick={props.onEditAvatar}></button>
      </div>
      <div className="profile__info">
        <div className="profile__edit">
          <h1 className="profile__name">Жак-Ив Кусто</h1>
          <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
        </div>
        <p className="profile__profession">Исследователь океана</p>
      </div>
      <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
    </section>

    <section className="cards">
      <ul className="cards__list"></ul>
    </section>
  </main>)
}

export default Main