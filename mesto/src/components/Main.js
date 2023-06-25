function Main() {
   function handleEditAvatarClick() {
    const popupAvatar = document.querySelector(".popup_type_avatar");
    popupAvatar.classList.add("popup_opened");
    }
    function handleEditProfileClick() {
        const popupEdit = document.querySelector(".popup_type_edit");
        popupEdit.classList.add("popup_opened");
    }
    function handleAddPlaceClick() {
        const addPopup = document.querySelector(".popup_type_add");
        addPopup.classList.add("popup_opened");
       }

    return ( <main className="content">
    <section className="profile">
      <div className="profile__avatar-edit">
        <img className="profile__avatar" src="#" alt="Фотография профиля" />
        <button className="profile__avatar-edit-button" type="button" onClick={handleEditAvatarClick}></button>
      </div>
      <div className="profile__info">
        <div className="profile__edit">
          <h1 className="profile__name">Жак-Ив Кусто</h1>
          <button className="profile__edit-button" type="button" onClick={handleEditProfileClick}></button>
        </div>
        <p className="profile__profession">Исследователь океана</p>
      </div>
      <button className="profile__add-button" type="button" onClick={handleAddPlaceClick}></button>
    </section>

    <section className="cards">
      <ul className="cards__list"></ul>
    </section>
  </main>)
}

export default Main