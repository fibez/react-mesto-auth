import React, { useEffect, useState } from 'react';
import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';
import { api } from './utils/Api';
import { CurrentUserContext } from '../context/CurrentUserContext';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Login } from './Login';
import { Register } from './Register';
import { ProtectedRouteElement } from './ProtectedRoute';
import * as auth from './utils/auth';

function App() {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isInfoToooltipOpen, setInfoToolTipOpen] = useState(false);

  const navigate = useNavigate();

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

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      auth.checkToken(token).then((res) => {
        if (res) {
          setUserEmail(res.data.email);
          setLoggedIn(true);
          navigate('/', { replace: true });
        }
      });
    }
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

  function handleInfoTooltipOpen() {
    setInfoToolTipOpen(true);
  }
  function closeAllPopups() {
    setIsEditProfileOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    setInfoToolTipOpen(false);
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

  function handleLogout() {
    setLoggedIn(false);
    navigate('/sign-in', { replace: true });
    localStorage.removeItem('token');
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header userEmail={userEmail} onLogout={handleLogout} />
          <Routes>
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
                  isEditProfileOpen={isEditProfileOpen}
                  handleUpdateUser={handleUpdateUser}
                  isAddPlacePopupOpen={isAddPlacePopupOpen}
                  handleAddPlaceSubmit={handleAddPlaceSubmit}
                  isEditAvatarPopupOpen={isEditAvatarPopupOpen}
                  handleUpdateAvatar={handleUpdateAvatar}
                  selectedCard={selectedCard}
                />
              }
            />
            <Route
              path="/sign-up"
              element={
                <Register
                  handleInfoTooltipOpen={handleInfoTooltipOpen}
                  isInfoToooltipOpen={isInfoToooltipOpen}
                  onClose={closeAllPopups}
                />
              }
            />
            <Route
              path="/sign-in"
              element={
                <Login
                  onLogin={setLoggedIn}
                  handleInfoTooltipOpen={handleInfoTooltipOpen}
                  isInfoToooltipOpen={isInfoToooltipOpen}
                  onClose={closeAllPopups}
                />
              }
            />
          </Routes>
          <Footer />
        </div>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
