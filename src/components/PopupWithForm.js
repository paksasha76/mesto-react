function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${props.isOpen && "popup_opened"}`}
    >
      <div className="popup__content">
        <button className="popup__close-btn" type="button" onClick={props.onClose}></button>
        <h3 className="popup__title">{props.title}</h3>
        <form className={`popup__form popup__form_type_${props.name}`} onSubmit={props.onSubmit}>
          {props.children}
          <button type="submit" className="popup__save-button">{props.nameBtn}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
