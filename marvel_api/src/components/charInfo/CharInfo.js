import React, { Component } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/errorMessage";
import Skeleton from "../skeleton/Skeleton";

import "./charInfo.scss";
// import thor from '../../resources/img/thor.jpeg';
import MarvelService from "../../services/MarvelService";

class CharInfo extends Component {
  state = {
    char: null,
    loading: false,
    error: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.updateChar();
  }

  componentDidUpdate(prevProps) {
    const { charId } = this.props;
    if (charId !== prevProps.charId) {
      this.updateChar();
    }
  }

  newKey = () => Math.random().toString(36).substr(2, 7);

  updateChar = () => {
    const { charId } = this.props;
    if (!charId) {
      return;
    }

    this.onCharLoading();

    this.marvelService
      .getCharacter(charId)
      .then(this.onCharLoaded)
      .catch(this.onError);
    // this.foo.bar = 0; // для отлова ошибок через ErrorBoundary
  };

  onCharLoaded = (char) => {
    this.setState({
      char,
      loading: false,
    });
  };

  onCharLoading = () => {
    this.setState({
      loading: true,
    });
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  render() {
    const { char, loading, error } = this.state;
    const skeleton = char || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;
    return (
      <div className="char__info">
        {skeleton}
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki } = char;
  let { comics } = char;
  const newArrOfComics = [];
  if (comics.length === 0) {
    comics = [{ name: "Информации нет" }];
  }
  if (comics.length > 10) {
    for (let i = 0; i < 10; i++) {
      newArrOfComics.push(comics[i]);
    }
    newArrOfComics[10] = { name: "Полный список на сайте marvel.com" };
  }
  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {newArrOfComics.map((item) => (
          <li
            key={Math.random().toString(36).substr(2, 7)}
            className="char__comics-item"
          >
            {item.name}
          </li>
        ))}
      </ul>
    </>
  );
};

export default CharInfo;
