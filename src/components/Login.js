import { useState } from "react";

function Login(props) {
  const [email, setEmail] = useState(props.email);
  const [password, setPassword] = useState(props.password);

  function handleChangeEmail(event) {
    setEmail(event.target.value);
  }

  function handleChangePassword(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.changeBtnText("Вход...");
    props.onLogIn(email, password);
  }

  return (
    <section className="login">
      <form
        className="form form__theme-dark"
        name="loginForm"
        onSubmit={handleSubmit}
      >
        <h2 className="form__title form__title_theme-dark">Вход</h2>
        <input
          className="form__field form__field_theme-dark"
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleChangeEmail}
          autoFocus
          required
        />
        <span className="form__error-message" id="email-error"></span>
        <input
          className="form__field form__field_theme-dark"
          type="password"
          placeholder="Пароль"
          name="pwd"
          minLength="8"
          maxLength="100"
          value={password}
          onChange={handleChangePassword}
          required
        />
        <span className="form__error-message" id="pwd-error"></span>
        <button
          className="form__submit-button form__submit-button_theme-dark"
          type="submit"
          aria-label="кнопка Войти"
        >
          {props.btnText}
        </button>
      </form>
    </section>
  );
}

export default Login;
