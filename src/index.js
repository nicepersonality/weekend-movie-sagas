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
    yield takeEvery('FETCH_MOVIES', fetchMoviesSaga);
    yield takeEvery('FETCH_DETAILS', fetchDetailsSaga);
    yield takeEvery('FETCH_GENRES', fetchGenresSaga);
    yield takeEvery('UPDATE_MOVIE', updateMovieSaga);
}

// Retrieve the list of movies from the database
function* fetchMoviesSaga() {
    try {
        const response = yield axios.get('/api/movie');
        // console.log('fetchMoviesSaga', response.data);
        yield put({ type: 'SET_MOVIES', payload: response.data });
    } catch (error) {
        console.log('Error while fetching movies', error);
    }
}

function* fetchDetailsSaga(action) {
    const movieId = action.payload;
    try {
        const response = yield axios.get(`/api/movie/details/${movieId}`);
        // console.log('fetchDetailsSaga', response.data);
        yield put({ type: 'SET_DETAILS', payload: response.data });
    } catch (error) {
        console.log('Error while fetching details', error);
    }
}

function* fetchGenresSaga(action) {
    const movieId = action.payload;
    try {
        const response = yield axios.get(`/api/movie/genres/${movieId}`);
        // console.log('fetchGenresSaga:', response.data);
        yield put({ type: 'SET_GENRES', payload: response.data });
    } catch (error) {
        console.log('Error while fetching genres', error);
    }
}

function* updateMovieSaga(action) {
    try {
        yield axios.put(`/api/movie/update`, action.payload);
    } catch (error) {
        console.log('Error while updating movie', error);
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

// Used to store a specific movie's details
const details = (state = [], action) => {
    switch (action.type) {
        case 'SET_DETAILS':
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
        details,
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
