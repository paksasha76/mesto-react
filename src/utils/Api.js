import BaseData from "./BaseData.js";

const baseUrl = "https://nomoreparties.co/v1/cohort-68";
const headers = {
  authorization: "39748c5f-0d2d-4234-9c59-98ecf4137a9d",
  "Content-Type": "application/json",
  credentials: "include",
};

class Api extends BaseData {
  constructor(baseUrl, headers) {
    super(baseUrl);
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getUserData() {
    return this._request("users/me", {
      method: "GET",
      headers: this._headers,
    });
  }

  getAllCardsData() {
    return this._request("cards", {
      method: "GET",
      headers: this._headers,
    });
  }

  getInitialData() {
    return Promise.all([this._getUserData(), this.getAllCardsData()]);
  }

  setAvatar(_link) {
    return this._request("users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: _link,
      }),
    });
  }

  setUserInfo(_name, _description) {
    return this._request("users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: _name,
        about: _description,
      }),
    });
  }

  addNewCard(_cardName, _cardLink) {
    return this._request("cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: _cardName,
        link: _cardLink,
      }),
    });
  }

  deleteCard(_cardId) {
    return this._request(`cards/${_cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  setLike(_cardId) {
    return this._request(`cards/${_cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  deleteLike(_cardId) {
    return this._request(`cards/${_cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }
}

const api = new Api(baseUrl, headers);

export default api;
