function ImagePopup({ card, onClose }) {
  return (
    <div class={`popup popup_type_view ${card ? "popup_opened" : ""}`}>
      <div class="popup__zoom-view">
        <button class="popup__close-btn" type="button"></button>
        <img class="popup__zoom-image"   src={card ? card.link : "#"}
            alt={card ? card.name : "#"} />
        <p class="popup__zoom-title">{card ? card.name : ""}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
