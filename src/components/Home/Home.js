import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Link } from 'react-router-dom';


class Home extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_MOVIES' });
  }

  render() {
    return (
      <div className="Home-component">
        <h2>Now Playing</h2>
        {/* <pre>{JSON.stringify(this.props.storeInstance, null, 2)}</pre> */}
        <ul className="Home-list">
          {this.props.storeInstance.movies.map((movie) => {
            return (
              <li className="moviePreview" key={movie.id}>
                <h3 className="movieTitle">{movie.title}</h3>
                <div className="moviePoster">
                  <Link to={{
                    pathname: `/details/${movie.id}`,
                  }}>
                    <img src={movie.poster}
                      alt={movie.title}
                    />
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    )
  };
}


const mapStateToProps = storeInstance => ({
  storeInstance,
});
export default connect(mapStateToProps)(Home);
