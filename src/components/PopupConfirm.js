import PopupWithForm from "./PopupWithForm.js";

function PopupConfirm(props) {
  function handleSubmit(event) {
    event.preventDefault();
    props.changeBtnText("Удаление...");
    props.onCardDelete(props.clickPicture);
  }

  return (
    <PopupWithForm
      type="delConfirm"
      formTitle="Вы уверены?"
      btnText={props.btnText}
      opened={props.opened}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default PopupConfirm;
