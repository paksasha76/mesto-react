export default class BaseData {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _getToken() {
    return `Bearer ${localStorage.getItem("jwt")}`;
  }

  _request(_endUrl, _options) {
    return fetch(`${this._baseUrl}/${_endUrl}`, _options).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}
