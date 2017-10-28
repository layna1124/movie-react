import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import theme from './carousel.min.css'
import { BASE_URL, NOW_URL, API_KEY} from '../config';


export default class MainCarousel extends React.Component {
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
        <h1> 네트워크 요청 중 에러가 발생했습니다!</h1>
      )
    }
    if (!this.state.results.length) {
      return null
    }

    return (
      // <Carousel  showThumbs={false} showArrows={false} showStatus={false} onChange={onChange} onClickItem={onClickItem}>
      <Carousel>
        {this.state.results.slice(0,6).map(data => (
          //map쓰면 바로밑에 div가 각각 돔. 개수제한이 필요 6개만          
          <div key={data.id}>     
            <Link to={`/movie-detail/${data.id}`}>       
            <img src={`https://image.tmdb.org/t/p/w1920${data.backdrop_path}`}/>            
            <p className="legend">{data.overview}</p>           
            </Link>
          </div>          
        ))}
      </Carousel>		
    );

  }
}

/*
http://image.tmdb.org/t/p/w500/ 
http://image.tmdb.org/t/p/w1000/ 
http://image.tmdb.org/t/p/w1920/

<img src={`https://image.tmdb.org/t/p/w650_and_h365_bestv2${data.backdrop_path}`} />
url("https://image.tmdb.org/t/p/w650_and_h365_bestv2/tcheoA2nPATCm2vvXw2hVQoaEFD.jpg") 
*/