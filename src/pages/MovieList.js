import React from 'react';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import { BASE_URL, NOW_URL, API_KEY} from '../config';

export default class Moviedata extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      results: [],
      title: "",
      overview: "",
    }
  }

  componentDidMount = () => {
    const url_now = BASE_URL + NOW_URL + API_KEY
    fetch(`${url_now}`)  
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          isLoading: false,
          results: data.results,
        })
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          errorState: true,
        })
      })
  }

  render() {
    if (this.state.errorState) {
      return (
        <h1>
          네트워크 요청 중 에러가 발생했습니다!
        </h1>
      )
    }
    if (this.state.isLoading) {
      return <Loader />
    }
    if (!this.state.results.length) {
      return null
    }

    return (
      <div className="ui container">
        <div className="ui large header">Now Playing</div>
        <div className="ui divider hidden" />

        <div className="ui four column grid">
          {this.state.results.map(data => (
            <div className="column" key={data.id}>
              <Link to={`/movie-detail/${data.id}`}>
              <div className="ui fluid card">
                <div className="content">
                  <img src={`https://image.tmdb.org/t/p/w342${data.poster_path}`} className="max-w100"/>
                  <div className="header">{data.title}</div>
                  <div className="header">{data.vote_average}</div>
                  <div className="overview">{data.overview}</div>
                </div>              
              </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
