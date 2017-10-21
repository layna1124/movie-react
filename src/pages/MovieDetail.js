import React, { Component } from 'react';
import Card from '../components/card';
import Comment from '../components/comment-ui'

export default class MovieDetail extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      movieID: props.match.params.movieId  // 157336 
    }
  }

  render() {
    return (
      <div>
        <Card data={this.state} />
        <Comment currentUser={this.props.currentUser} movieid={this.props.match.params.movieId}/> 
      </div>
    )
  } // END render

  fetchMovieID(movieID) {
    let url = `https://api.themoviedb.org/3/movie/${movieID}?&api_key=de78d0edbef628a9c9df8ee5782b9f03`
    this.fetchApi(url)
  } // end function

  componentDidMount() {
    let url = `https://api.themoviedb.org/3/movie/${this.state.movieID}?&api_key=de78d0edbef628a9c9df8ee5782b9f03`
    this.fetchApi(url) 
  } // end component did mount function

  // the api request function
  fetchApi(url) {
    fetch(url).then((res) => res.json()).then((data) => {
      // update state with API data
      this.setState({
        movieID: data.id,
        original_title: data.original_title,
        tagline: data.tagline,
        overview: data.overview,
        homepage: data.homepage,
        poster: data.poster_path,
        production: data.production_companies,
        production_countries: data.production_countries,
        genre: data.genres,
        release: data.release_date,
        vote: data.vote_average,
        runtime: data.runtime,
        revenue: data.revenue,
        backdrop: data.backdrop_path
      })
    })

    // .catch((err) => console.log('Movie not found!'))

  } // end function

}
