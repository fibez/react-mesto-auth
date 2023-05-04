import { useContext, useEffect, useState } from 'react';
import { Card } from './Card';
import { CurrentUserContext } from '../context/CurrentUserContext';

function Main({ onCardClick, onEditAvatar, onEditProfile, onAddPlace, onCardLike, onCardDelete, cards }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <main className="content">
        <section className="profile content__profile">
          <div className="profile__info-container">
            <button className="profile__avatar-button" onClick={onEditAvatar}>
              <img className="profile__avatar" src={currentUser.avatar} alt="Аватар профиля" />
            </button>
            <p className="profile__description">{currentUser.about}</p>
            <div className="profile__name-button-container">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                className="profile__edit-button"
                type="button"
                aria-label="Редактировать описание профиля"
                onClick={onEditProfile}
              />
            </div>
          </div>
          <button className="profile__add-button" type="button" aria-label="Добавить фотографию" onClick={onAddPlace} />
        </section>
        <ul className="elements content__elements">
          {cards.map((card) => {
            return (
              <li key={card._id}>
                <Card card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
}

export { Main };
