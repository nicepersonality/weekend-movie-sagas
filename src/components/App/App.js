import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Home from '../Home/Home';

class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <main className="App-component">
          <Route path="/" exact component={Home} />
        </main>
        <Footer />
      </Router>
    );
  }
}

export default App;
