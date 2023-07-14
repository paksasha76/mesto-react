import React from "react"
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

    const [title, setTitle] = React.useState('');
    const [link, setLink] = React.useState('');
  
    React.useEffect(() => {
      if (props.isOpen) {
        setTitle('');
        setLink('');
      }
    }, [props.isOpen])
  
    function handleTitleChange(event) {
      setTitle(event.target.value);
    }
  
    function handleLinkChange(event) {
      setLink(event.target.value);
    }
  
    function handleSubmit(e) {
      e.preventDefault();
  
      props.onAddPlace({
        name: title,
        link: link
      });
    }
  

    return(<PopupWithForm
        name="add"
        title="Новое место"
        nameBtn="Создать"
        isOpen={props.isOpen}
        onClose={props.onClose} 
        onSubmit={handleSubmit}
        children={
          <>
            <input
              id="title-input"
              className="popup__input popup__input_type_title"
              type="text"
              name="name"
              placeholder="Название"
              minlength="2"
              maxlength="30"
              required
              value={title}
              onChange={handleTitleChange}
            />
            <span className="popup__input-error title-input-error"></span>
            <input
              id="link-input"
              className="popup__input popup__input_type_link"
              type="url"
              name="link"
              placeholder="Ссылка на карточку"
              required
              value={link}
              onChange={handleLinkChange}
            />
            <span className="popup__input-error link-input-error"></span>
          </>
        }
      />)
}

export default AddPlacePopup;