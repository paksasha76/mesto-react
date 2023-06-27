export default function Card({ card, onCardClick, onCardDelete }) {
  return (

      <li className="place">
        <img className="place__photo" src={card.link} alt={card.name}   onClick={() => onCardClick({ name: card.name, link: card.link })}/>
        <button className="place__delete-button" type="button" onClick={onCardDelete}></button>
        <div className="place__description">
          <h2 className="place__title">{card.name}</h2>
          <div className="place__like-container">
            <button className="place__like" type="button"></button>
            <p className="place__like-counter">{card.likes.length}</p>
          </div>
        </div>
      </li>

  );
}
