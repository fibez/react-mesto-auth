function Login() {
  return (
    <form className="enterance-form" name={'sign-in'}>
      <h1 className="enterance-form__title">Вход</h1>
      <input className="enterance-form__input" placeholder="Email"></input>
      <input className="enterance-form__input" placeholder="Пароль"></input>
      <button className="enterance-form__submit-button" type="submit">
        Войти
      </button>
    </form>
  );
}

export { Login };
