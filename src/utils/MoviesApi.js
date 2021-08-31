class Api {
    constructor(config) {
        this.headers = config.headers;
        this.url = config.url;
    }

    getAllFilms() {
        return fetch(this.url, {
            headers: this.headers,
        })
    }
}

const config = {
    url: "https://api.nomoreparties.co/beatfilm-movies",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
}

const moviesApi = new Api(config);

export default moviesApi;