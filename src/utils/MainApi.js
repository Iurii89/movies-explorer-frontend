class Api {
    constructor(config) {
        this.headers = config.headers;
        this.url = config.url;
    }

    handleOriginalResponse(res) {
        if (!res.ok) {
            return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
    }

    register(name, email, password) {
        return fetch(`${this.url}/signup`, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "authorization": `Bearer ${localStorage.getItem('token')}`,
            },
            credentials: "include",
            body: JSON.stringify({
                name,
                email,
                password,
            })
        })
    }

    login(email, password) {
        return fetch(`${this.url}/signin`, {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "authorization": `Bearer ${localStorage.getItem('token')}`,
            },
            credentials: "include",
            body: JSON.stringify({
            email,
            password,
            })
        })
    }

    getUserData() {
        return fetch(`${this.url}/users/me`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "authorization": `Bearer ${localStorage.getItem('token')}`,
            },
        });
    }

    updateUser(email, name) {
        return fetch(`${this.url}/users/me`, {
            method: 'PATCH',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "authorization": `Bearer ${localStorage.getItem('token')}`,
            },
            credentials: "include",
            body: JSON.stringify({
            email,
            name,
            })
        });
    }

    getMovise() {
        return fetch(`${this.url}/movies`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "authorization": `Bearer ${localStorage.getItem('token')}`,
            },
        }).then(this.handleOriginalResponse);
    }

    sendSavedMovies(savedMovies) {
        return fetch(`${this.url}/movies`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "authorization": `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
                country: savedMovies.country,
                director: savedMovies.director,
                duration: savedMovies.duration,
                year: savedMovies.year,
                description: savedMovies.description,
                image: `https://api.nomoreparties.co${savedMovies.image.url}`,
                trailer: savedMovies.trailerLink,
                nameRU: savedMovies.nameRU,
                nameEN: savedMovies.nameEN,
                thumbnail: `https://api.nomoreparties.co${savedMovies.image.formats.thumbnail.url}`,
                movieId: savedMovies.id,
            }),
        }).then(this.handleOriginalResponse);
    }

    deleteCard(movieId) {
        return fetch(`${this.url}/movies/${movieId}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "authorization": `Bearer ${localStorage.getItem('token')}`,
            },
        }).then(this.handleOriginalResponse);
    }
}

const config = {
    url: "https://api.movies-iurii.nomoredomains.club",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "authorization": `Bearer ${localStorage.getItem('token')}`,
    },
}

const mainApi = new Api(config);

export default mainApi;