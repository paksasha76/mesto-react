function ImagePopup(props) {
  return (
    <div class={`popup popup_type_view ${props.card ? "popup_opened" : ""}`}>
      <div class="popup__zoom-view">
        <button class="popup__close-btn" type="button" onClick={props.onClose}></button>
        <img class="popup__zoom-image"   src={props.card ? props.card.link : "#"}
            alt={props.card ? props.card.name : "#"} />
        <p class="popup__zoom-title">{props.card ? props.card.name : ""}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
