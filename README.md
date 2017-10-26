# 1025
- main slide : react-responsive-carousel 설치  
- main preview list : map slice(0,5) 인자두개 6개 
- search : 버그수정 Update
- 리뷰 삭제 : 빈객체를 push해주는 방법, del누를때 어떤객체가 지워져야하는지 알수있도록 키값넣음 
```js
this.setState({ 
  messages: map(snapshot.val(), (message, key) => ({ id: key, ...message}))
})
database.ref('/messages' + '/' + this.props.movieid).child(message.id).remove(); 
```

# 1020 
- MovieDetail : comment-ui 
- firebase Login : app.js , LoginHeader,  CurrentUser  
- Movie Search : app.js, SearchBar

## 검색
window링크를 쓰지않고, react-router-dom의 withRouter 사용.   
히스토리를 만들어서 이동 (리액트의 히스토리는 리스트 같은것 그래서 push)
```js
// this.props.dispatch(push('/movie/' + suggestion.id)); 
this.props.history.push('/movie-detail/' + suggestion.id);
...
export default withRouter(SearchBar); 
```

## 로그인정보 이용  
- currentUser 정보가 해더에 있어서 comment compnent까지 설정이 안되어 있음 
- <해결> 메뉴라우터에서 컴포넌트를 함수화 :  
커런트유저에 this.state해주면 리엑트도구로 볼때 값이 들어가는것을 확인. 
comment파일이 MoiveDeatil 안에 있어서 한번더 이름을 정하고 props를 넣음  

app.js
```js
<Route path="/movie-detail/:movieId" render={(props) =><MovieDecurrentUser={this.state.currentUser} {...props} />}/>
```

MovieDetail.js
```js
render() {
  return (
    <div>
      <Card data={this.state} />
      <Comment currentUser={this.props.currentUser} movieid{this.props.match.params.movieId}/> 
    </div>
  )
} 
```
디비에 movie.id 별로 저장되는것을 확인  


---

# 1018
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