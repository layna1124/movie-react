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


const routes = [
  {
    linkLabel: 'Home',
    linkTo: '/',
  },
  {
    linkLabel: 'MovieList',
    linkTo: '/movie-list',
  },

  {
    linkLabel: 'Movie Review',
    linkTo: '/movie-review',
  },

]

class App extends Component {
  constructor(props) {
    super(props);
  }

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
                    <div className="ui icon input">
                      <input type="text" placeholder="Search..." />
                      <i className="search link icon"></i>
                    </div>
                  </div>
                  <a className="ui item">Login</a>
                </div>
              </div>
            </div>

            <div className="ui divider hidden" />            
            <Route exact path="/" component={HomePage} />
            <Route path="/movie-list" component={MovieList} />
            <Route path="/movie-detail/:movieId" component={MovieDetail} />
            <Route path="/movie-review" component={MovieReview} />
          </div>
        </Provider>
      </BrowserRouter >
    )
  }
}

export default App
