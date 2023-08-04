import Popup from "./Popup.js";

function PicturePopup(props) {
  return (
    <Popup opened={props.opened} type="image" onClose={props.onClose}>
      <img
        className="popup__image"
        src={`${props.selectedCard.link}`}
        alt={`Фото: ${props.selectedCard.name}`}
      />
      <figcaption className="popup__image-text">
        {props.selectedCard.name}
      </figcaption>
    </Popup>
  );
}

export default PicturePopup;
