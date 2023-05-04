class Api {
  constructor(path, token) {
    this._basePath = path;
    this._authToken = token;
  }

  _request(path, method, body) {
    return fetch(`${this._basePath}/${path}`, {
      method: method,
      headers: {
        authorization: this._authToken,
        'Content-Type': 'application/json',
      },
      body: body,
    }).then(this._checkStatus);
  }

  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Error: ${res.status}`);
  }

  getCards() {
    return this._request('cards', 'GET');
  }

  getUserInfo() {
    return this._request('users/me', 'GET');
  }

  getUserId() {
    Promise(this.getUserInfo()).then((res) => {
      return res._id;
    });
  }

  updateUserInfo(data) {
    return this._request(
      'users/me',
      'PATCH',
      JSON.stringify({
        name: data.name,
        about: data.about,
      })
    );
  }

  addNewCard(formValues) {
    return this._request(
      '/cards',
      'POST',
      JSON.stringify({
        name: formValues.name,
        link: formValues.link,
      })
    );
  }

  updateAvatar(link) {
    return this._request(
      'users/me/avatar',
      'PATCH',
      JSON.stringify({
        avatar: link,
      })
    );
  }

  deleteCard(cardId) {
    return this._request(`cards/${cardId}`, 'DELETE');
  }

  updateLike(cardId, method) {
    return this._request(`cards/${cardId}/likes`, method);
  }
}

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-59', '3a99dc75-7908-4d48-95a2-7baec3f5e64d');

export { api };
