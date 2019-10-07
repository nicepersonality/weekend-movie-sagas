import React, { Component } from 'react';
import { connect } from 'react-redux';


class EditDetails extends Component {
  state = {
    updateMovie: {
      id: -1,
      title: '',
      description: ''
    }
  }

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
    this.setState({
      updateMovie: {
        ...this.state.updateMovie,
        id: parseInt(movieId),
      }
    });
  }

  handleChangeFor = (event, propertyName) => {
    this.setState({
      updateMovie: {
        ...this.state.updateMovie,
        [propertyName]: event.target.value,
      }
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.updateMovie);
    this.props.dispatch({
      type: 'UPDATE_MOVIE',
      payload: this.state.updateMovie
    });
    // The following trick is horribly hacky and I am embarassed by it.
    // However, after three hours, I haven’t figured out any working method
    // to make the MovieDetails component rerender after the database changes,
    // so all I can do is add a delay just long enough to allow the database
    // to finish updating before MovieDetails’s initial render.
    setTimeout(this.goToDetails, 50);
  }

  goToDetails = () => {
    this.props.history.push(`/details/${this.props.match.params.movieId}`);
  }

  render() {
    return (
      <div className="EditDetails-component">
        {/* state {JSON.stringify(this.state)}<br /> */}
        <form onSubmit={this.handleSubmit}>
          {this.props.storeInstance.details.map((movie) => {
            return (
              <div className="MovieDetails-display" key={movie.id}>
                <div className="movieTitle">
                  <h4>
                    <label>Edit title:
                      <input type='text'
                        defaultValue={movie.title}
                        // value={this.state.updateMovie.title}
                        onChange={(event) => this.handleChangeFor(event, 'title')} />
                    </label>
                  </h4>
                </div>
                <div className="moviePoster">
                  <img src={movie.poster}
                    alt={movie.title}
                  />
                </div>
                <div className="movieDescription">
                  <h4>
                    <label>Edit description:
                      <textarea
                        defaultValue={movie.description} rows="8" cols="40"
                        // value={this.state.updateMovie.description}
                        onChange={(event) => this.handleChangeFor(event, 'description')} /></label>
                  </h4>
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
            <button onClick={() => { this.props.history.push(`/details/${this.props.match.params.movieId}`) }}>Cancel</button>
            <button type="submit">Save Changes</button>
          </div>
        </form>
        {/* <pre>{JSON.stringify(this.props, null, 2)}</pre> */}
      </div>
    )
  };
}


const mapStateToProps = storeInstance => ({
  storeInstance,
});
export default connect(mapStateToProps)(EditDetails);
