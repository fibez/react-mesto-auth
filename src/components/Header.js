import logo from '../images/logo.svg';
import { NavBar } from './NavBar';

function Header() {
  return (
    <>
      <header className="header page__header">
        <img className="header__logo" src={logo} alt="Логотип портала" />
        <NavBar />
      </header>
    </>
  );
}

export { Header };
