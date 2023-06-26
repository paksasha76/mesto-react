function ImagePopup() {
  return (
    <div class="popup popup_type_view">
      <div class="popup__zoom-view">
        <button class="popup__close-btn" type="button"></button>
        <img class="popup__zoom-image" src="#" alt="Фото места" />
        <p class="popup__zoom-title"></p>
      </div>
    </div>
  );
}

export default ImagePopup;
