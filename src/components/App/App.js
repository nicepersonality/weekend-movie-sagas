import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Home from '../Home/Home';
import MovieDetails from '../MovieDetails/MovieDetails';

class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <main className="App-component">
          <Route path="/" exact component={Home} />
          <Route path='/details/:movieId' component={MovieDetails} />
        </main>
        <Footer />
      </Router>
    );
  }
}

export default App;
