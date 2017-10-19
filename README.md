
## 코멘트  
https://api.themoviedb.org/3/movie/1578336/comment 

```
<Route path="/movie-detail/:movieId" component={MovieDetail} />

this.state = {
  movieID: props.match.params.movieId // 157336 
}
```


## 페이지
- HomePage
- MovieList -> MovieDetail (card/comment-ui)


## 이미지
```
import laura from '../images/avatar/small/laura.jpg';
<img src={laura}/>
```