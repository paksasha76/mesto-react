import BaseData from "./BaseData.js";

const baseUrl = "https://auth.nomoreparties.co";
const headers = { "Content-Type": "application/json" };
class Auth extends BaseData {
  constructor(baseUrl, headers) {
    super(baseUrl);
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  registrate(_email, _password) {
    return this._request("signup", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: _email,
        password: _password,
      }),
    });
  }

  logIn(_email, _password) {
    return this._request("signin", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email: _email,
        password: _password,
      }),
    });
  }

  checkToken(_token) {
    return this._request("users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: this._getToken(),
        credentials: "include",
      },
    });
  }
}

const auth = new Auth(baseUrl, headers);

export default auth;
