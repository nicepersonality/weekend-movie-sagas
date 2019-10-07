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
            <div className="MovieDetails-display" key={movie.id}>
              <h2 className="movieTitle">{movie.title}</h2>
              <div className="moviePoster">
                <img src={movie.poster}
                  alt={movie.title}
                />
              </div>
              <div className="movieDescription">
                {movie.description}
              </div>
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
            </div>
          );
        })}
        <div className="movieDetails-controls">
          <button onClick={() => {this.props.history.push(`/`)}}>Back to List</button>
          <button onClick={() => {this.props.history.push(`/edit/${this.props.match.params.movieId}`)}}>Edit</button>
        </div>
        {/* <pre>{JSON.stringify(this.props, null, 2)}</pre> */}
      </div>
    )
  };
}


const mapStateToProps = storeInstance => ({
  storeInstance,
});
export default connect(mapStateToProps)(MovieDetails);
