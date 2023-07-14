function ImagePopup(props) {
  return (
    <div className={`popup popup_type_view ${props.card ? "popup_opened" : ""}`}>
      <div className="popup__zoom-view">
        <button className="popup__close-btn" type="button" onClick={props.onClose}></button>
        <img className="popup__zoom-image"   src={props.card ? props.card.link : "#"}
            alt={props.card ? props.card.name : "#"} />
        <p className="popup__zoom-title">{props.card ? props.card.name : ""}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
