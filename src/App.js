import React, { Component } from 'react';
import {
  BrowserRouter,
  Link,
  Route,
} from 'react-router-dom';
import {
  Provider,
} from 'react-redux';
import store from './store';
import 'semantic-ui/dist/semantic.css';
import HeaderItem from './components/HeaderItem'

import HomePage from './pages/HomePage'
import MovieList from './pages/MovieList'

import MovieDetail from './pages/MovieDetail'
import SearchBar from './components/SearchBar';
import LoginHeader from './components/LoginHeader';
import {
  database,//여기연결필요없나
  auth,
  googleProvider,
} from './firebase';
import { URL_SEARCH, API_KEY_ALT, BASE_URL, API_KEY } from './config';

/* search start*/
const SEARCH_MOVIE = 'SEARCH_MOVIE';
const SEARCH_MOVIE_SUCCESS = 'SEARCH_MOVIE_SUCCESS';
const SEARCH_MOVIE_FAILURE = 'SEARCH_MOVIE_FAILURE';

const defaultStateList = {
  isFetching: false,
  items: [],
  error: {}
};

const movieList = (state = defaultStateList, action) => {
  switch (action.type) {
    case SEARCH_MOVIE:
      return { ...state, isFetching: true };
    case SEARCH_MOVIE_SUCCESS:
      return { ...state, isFetching: false, items: action.data };
    case SEARCH_MOVIE_FAILURE:
      return { ...state, isFetching: false, error: action.data };
    default:
      return state;
  }
};

function searchMovie(searchText) {
  return {
    type: SEARCH_MOVIE,
    searchText
  };
}
function searchMovieSuccess(data, keyword) {
  return {
    type: SEARCH_MOVIE_SUCCESS,
    data,
    keyword
  };
}
function searchMovieFail(error) {
  return {
    type: SEARCH_MOVIE_FAILURE,
    error
  };
}
const input = (state = '', action) => {
  if (action.type) {
    return Object.assign({}, state, {
      isFetching: true
    });
    return state;
  }
};
function searchMovieList(keyword) {
  let searchUrl = URL_SEARCH + keyword + API_KEY_ALT;
  return function (dispatch) {
    dispatch(searchMovie())
    return fetch(searchUrl)
      .then(response => response.json())
      .then(json => json.results)
      .then(data => dispatch(searchMovieSuccess(data, keyword)))
      .catch(error => dispatch(searchMovieFail(error)))
  }
}
/* -- search end */

const routes = [
  {
    linkLabel: 'Home',
    linkTo: '/',
  },
  {
    linkLabel: 'MovieList',
    linkTo: '/movie-list',
  },
]

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
    }
    this.onAuthChange = auth.onAuthStateChanged((user) => {
      if (user) {
        const currentUser = {};
        currentUser.name = user.displayName;
        currentUser.photoUrl = user.photoURL;
        this.setState({
          currentUser: currentUser,
        })

      } else {
        this.setState({
          currentUser: {
            name: '',
            photoUrl: '',
          }
        })
      }
    })
  }
  loginWithGoogle = () => {
    auth.signInWithPopup(googleProvider)
      .then((user) => {
        console.log(user)
      })
      .catch(error => console.log(error))
  }

  logout = () => auth.signOut()


  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <div>
            <div className="ui container">
              <div className="ui secondary pointing menu">
                {routes.map((route) => <HeaderItem
                  key={route.linkLabel}
                  linkTo={route.linkTo}
                  label={route.linkLabel}
                />)}
                <div className="right menu">
                  <div className="item">
                    <div className="item">
                      <SearchBar />
                    </div>
                  </div>
                  <LoginHeader
                    currentUser={this.state.currentUser}
                    loginHandler={this.loginWithGoogle}
                    logoutHandler={this.logout}
                  />     
                </div>
              </div>
            </div>

            <div className="ui divider hidden" />            
            <Route exact path="/" component={HomePage} />
            <Route path="/movie-list" component={MovieList} />
            <Route path="/movie-detail/:movieId" render={(props) => <MovieDetail currentUser={this.state.currentUser} {...props} />} />
            {/* <Route path="/movie-review" component={MovieReview} /> */}
          </div>
        </Provider>
      </BrowserRouter >
    )
  }
}

export default App
