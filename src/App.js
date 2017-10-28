import React, { Component } from 'react';
import {
  BrowserRouter,
  //Link,
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
  auth,
  googleProvider,
} from './firebase';


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
