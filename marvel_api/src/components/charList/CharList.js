import React, { Component } from "react";
import "./charList.scss";
// import abyss from '../../resources/img/abyss.jpg';
import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/errorMessage";
import Spinner from "../spinner/Spinner";

class CharList extends Component {
  state = {
    charList: [],
    loading: true,
    error: false, // eslint-disable-next-line
    newItemLoading: false,
    offset: 1541, // eslint-disable-next-line
    charEnded: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    // this.foo.bar = 0; // для отлова ошибок через ErrorBoundary
    this.onRequest();
  }

  componentDidUpdate() {}
  componentWillUnmount() {}
  newKey = () => Math.random().toString(36).substr(2, 7);

  onCharListLoading = () => {
    this.setState({
      // eslint-disable-next-line
      newItemLoading: true,
    });
  };

  onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }
    this.setState(({ offset, charList }) => ({
      charList: [...charList, ...newCharList],
      loading: false, // eslint-disable-next-line
      newItemLoading: false,
      offset: offset + 9, // eslint-disable-next-line
      charEnded: ended,
    }));
  };

  onRequest = (offset) => {
    this.onCharListLoading();
    this.marvelService
      .getAllCharacters(offset)
      .then(this.onCharListLoaded)
      .catch(this.onError);
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  renderItems(array) {
    const items = array.map((item) => {
      let imgStyle = { objectFit: "cover" };
      if (item.thumbnail === "23") {
        imgStyle = { objectFit: "unset" };
      }
      const { onCharSelected } = this.props;
      return (
        <li
          className="char__item"
          key={item.id}
          onClick={() => {
            onCharSelected(item.id);
          }}
        >
          <img src={item.thumbnail} alt={item.name} style={imgStyle} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });
    return <ul className="char__grid">{items}</ul>;
  }

  render() {
    const { charList, loading, error, offset, newItemLoading, charEnded } =
      this.state;
    const items = this.renderItems(charList);
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;

    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        {content}
        <button
          type="button"
          className="button button__main button__long"
          disabled={newItemLoading}
          style={{ display: charEnded ? "none" : "block" }}
          onClick={() => this.onRequest(offset)}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
