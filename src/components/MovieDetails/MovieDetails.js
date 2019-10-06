import React, { Component } from 'react';
import { connect } from 'react-redux';


class MovieDetails extends Component {
  componentDidMount() {
    const { movieId } = this.props.match.params;
    this.props.dispatch({ type: 'FETCH_MOVIES' });
    this.props.dispatch({
      type: 'FETCH_DETAILS',
      payload: movieId
    });
    this.props.dispatch({
      type: 'FETCH_GENRES',
      payload: movieId
    });
  }

  render() {
    return (
      <div className="MovieDetails-component">
        {this.props.storeInstance.details.map((movie) => {
          return (
            <>
              <h2 key={movie.id}>{movie.title}</h2>
              <div className="moviePoster">
                <img src={movie.poster}
                  alt={movie.title}
                />
              </div>
              <div className="movieDescription">
                {movie.description}
              </div>
            </>
          );
        })}

        <div className="movieGenres">
          <h3>Genres:</h3>
          <ul>
            {this.props.storeInstance.genres.map((genre) => {
              return (
                <li className="movieGenre" key={genre.id}>
                  {genre.name}
                </li>
              );
            })}
          </ul>
        </div>
        <pre>{JSON.stringify(this.props.storeInstance, null, 2)}</pre>
      </div>
    )
  };
}


const mapStateToProps = storeInstance => ({
  storeInstance,
});
export default connect(mapStateToProps)(MovieDetails);
