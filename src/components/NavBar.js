import { Route, Routes } from 'react-router-dom';

function NavBar() {
  const currentPath = window.location.pathname;

  function getButton(currentPath) {
    switch (currentPath) {
      case '/home':
        return <button className="header__navigation-button">Регистрация</button>;
      case '/about':
        return <button className="header__navigation-button">О нас</button>;
      case '/contact':
        return <button className="header__navigation-button">Контакты</button>;
      default:
        return <button className="header__navigation-button">Войти</button>;
    }
  }

  return (
    <>
      <Routes>
        <Route path="*" element={getButton(currentPath)} />
      </Routes>
    </>
  );
}

export { NavBar };
