import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
// Import axios for server requests
import axios from 'axios';

/** ---------- SAGAS ---------- **/

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIE', fetchMovieSaga);
}

// Retrieve the list of movies from the database
function* fetchMovieSaga(){
    try {
        const response = yield axios.get('/api/movie');
        console.log('THIS IS FROM GET', response.data);        
        yield put({ type: 'SET_MOVIES', payload: response.data });
    } catch (error) {
        console.log('Error while fetching elements', error);
    }    
  }
  

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

/** ---------- REDUCERS & STORES ---------- **/

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

/** ---------- PASS STORE+SAGAS INTO APP ---------- **/

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
