class MarvelService {
  _apiBase = "https://gateway.marvel.com:443/v1/public/";
  _apiKey = "apikey=0ef46a4687c5c782ff056904865aab5b";
  _baseOffset = 210;

  getResource = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(
        `Ошибка ${res.status}!!! Не возможно получить данные от ${url}`
      );
    }
    return await res.json();
  };

  getAllCharacters = async (offset = this._baseOffset) => {
    // return
    const res = await this.getResource(
      `${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`
    );
    return res.data.results.map(this._transformCharacter);
  };

  getCharacter = async (id) => {
    const res = await this.getResource(
      `${this._apiBase}characters/${id}?${this._apiKey}`
    );
    return this._transformCharacter(res.data.results[0]);
  };

  _transformCharacter = (char) => {
    let descr;
    if (!char.description) {
      descr = "Информации нет";
    } else {
      descr = char.description.substring(0, 200) + "...";
    }
    return {
      id: char.id,
      name: char.name,
      description: descr,
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };
}

export default MarvelService;
