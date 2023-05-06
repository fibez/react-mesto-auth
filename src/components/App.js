// import './App.css';
import React, { useEffect, useState } from 'react';
import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';
import { PopupProfileEdit } from './PopupProfileEdit';
import { PopupCardsAdd } from './PopupCardsAdd';
import { PopupEditAvatar } from './PopupEditAvatar';
import { ImagePopup } from './ImagePopup';
import { PopupRemoveCard } from './PopupRemoveCard';
import { api } from './utils/Api';
import { CurrentUserContext } from '../context/CurrentUserContext';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Login } from './Login';
import { Register } from './Register';
import { ProtectedRouteElement } from './ProtectedRoute';

function App() {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([userInfo, initialCards]) => {
        setCurrentUser(userInfo);

        setCards(initialCards);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function handleEditProfileCLick() {
    setIsEditProfileOpen(true);
  }

  function handleAddCardClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick({ name, link }) {
    setSelectedCard({ name, link });
  }

  function closeAllPopups() {
    setIsEditProfileOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    const method = isLiked ? 'DELETE' : 'PUT';

    api
      .updateLike(card._id, method)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleUpdateUser(data) {
    api.updateUserInfo(data).then(() => {
      api
        .getUserInfo()
        .then((userInfo) => {
          setCurrentUser(userInfo);
          closeAllPopups();
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }

  function handleUpdateAvatar(url) {
    api.updateAvatar(url).then(() => {
      api
        .getUserInfo()
        .then((userInfo) => {
          setCurrentUser(userInfo);
          closeAllPopups();
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }

  function handleAddPlaceSubmit(formValues) {
    api
      .addNewCard(formValues)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header />
          <Routes>
            <Route path="*" element={loggedIn ? <Navigate to="/" replace /> : <Navigate to="/sign-in" replace />} />
            <Route
              path="/"
              element={
                <ProtectedRouteElement
                  element={Main}
                  loggedIn={loggedIn}
                  onEditAvatar={handleAvatarClick}
                  onEditProfile={handleEditProfileCLick}
                  onAddPlace={handleAddCardClick}
                  onCardClick={handleCardClick}
                  onClose={closeAllPopups}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                />
              }
            />
            <Route path="/sign-up" element={<Register />} />
            <Route path="/sign-in" element={<Login />} />
            {/* <Route
              path="/sign-in"
              element={loggedIn ? <Navigate to="/" replace /> : <Navigate to="/sign-in" replace />}
            /> */}
          </Routes>
          <Footer />
          <PopupProfileEdit isOpened={isEditProfileOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <PopupCardsAdd isOpened={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
          <PopupEditAvatar
            isOpened={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <PopupRemoveCard isOpened={''} /> {/*-------------------*/}
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
