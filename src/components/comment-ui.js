//import React from 'react';
import React, { Component } from 'react';
import {
  database,
    auth,
    googleProvider,
} from '../firebase';
import map from 'lodash/map' 
 
export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messages: [], //db에서 받아올때  
      star: '' , // 5 
      currentUser: {
        name:'', // user.displayName 정해진것 보고써놔야편해   
        photoUrl:'', // user.photoUrl
        email:'', // user.email
      }      
    }
  }

  //value 이벤트를 사용하여 이벤트 발생 시점에 특정 경로에 있던 내용의 정적 스냅샷을 읽을 수 있습니다
  //val() 메소드로 snapshot의 데이터를 검색
  getMessagesFromDB = () => {
    database.ref('/messages' + '/' + this.props.movieid).on('value', (snapshot) => {
      this.setState({
        messages: map(snapshot.val(), (message => message))
        // stararray
      })
    })
  }
  componentDidMount = () => { 
    database.ref('/messages' + '/' + this.props.movieid).on('value', (snapshot) => { 
      this.setState({ //message를 인자로 받아서 로컬한 메시지스로 넣어줌 ,  
        // 삭제위해 put부분 변경 
        // this.setstate는 리스트형태  snapshot은 객체형태 . 키값 있어야 가져오니까  
        messages: map(snapshot.val(), (message, key) => ({ id: key, ...message})) 
      })
    })  
  }

  onTextChange = (e) => {//textarea
    this.setState({
      message: e.target.value,
    })
  }
  
  loginWithGoogle = () => {
    auth.signInWithPopup(googleProvider)
      .then((user) => {
        console.log(user)
      })
      .catch(error => console.log(error))
  }

  addMessageToDB= () => { //form에 submit 
    console.log('send')
    const currentTime = new Date(); 
    const message = {
      time : currentTime.toLocaleTimeString(),
      text : this.state.message, 
      userName : this.props.currentUser.name,
      photoUrl: this.props.currentUser.photoUrl,
      star: this.state.star, //별점 1027
    } 

    database.ref('/messages' + '/' + this.props.movieid).push(message);   
    this.setState({
      message:'',
      star:'',
    })
  }


  render = () => {

    var starAverage = (array) => {
      let result = 0;
        for(let item of array){
          result += item;
        }
        return result/array.length;
      }

    return (
      <div className="ui container"> 
        <form className="ui form">
          <div className="field">
            <label>Comment</label>          
 
            {this.props.currentUser.name === '' ? ( 
            <textarea
              placeholder="로그인이 필요합니다" 
              rows= "3"
              onFocus={this.loginWithGoogle}             
            >
            </textarea>
            ):(
              <textarea
              onChange ={this.onTextChange}
              value={this.state.message}
              placeholder="입력하세요" 
              rows= "3"
            >        
            </textarea>     
            )} 

            <div>
              <input type="radio" name="vote" value="1" checked={this.state.star === 1}
              onChange={(e) => this.setState({ star: 1 })}
              />
              <label htmlFor="vote1"> 1점</label>
              <input type="radio" name="vote" value="2" checked={this.state.star === 2}
              onChange={(e) => this.setState({ star: 2 })}
              />
              <label htmlFor="vote3"> 2점</label>
              <input type="radio" name="vote" value="3" checked={this.state.star === 3}
              onChange={(e) => this.setState({ star: 3 })}
              />
              <label htmlFor="vote4"> 3점</label>
              <input type="radio" name="vote" value="4" checked={this.state.star === 4}
              onChange={(e) => this.setState({ star: 4 })}
              />
              <label htmlFor="vote5"> 4점</label>
              <input type="radio" name="vote" value="5" checked={this.state.star === 5}
              onChange={(e) => this.setState({ star: 5 })}
              />
              <label htmlFor="vote6"> 5점</label>
              <input type="radio" name="vote" value="6" checked={this.state.star === 6}
              onChange={(e) => this.setState({ star: 6 })}
              />
              <label htmlFor="vote1"> 6점</label>
              <input type="radio" name="vote" value="7" checked={this.state.star === 7}
              onChange={(e) => this.setState({ star: 7 })}
              />
              <label htmlFor="vote3"> 7점</label>
              <input type="radio" name="vote" value="8" checked={this.state.star === 8}
              onChange={(e) => this.setState({ star: 8 })}
              />
              <label htmlFor="vote4"> 8점</label>
              <input type="radio" name="vote" value="9" checked={this.state.star === 9}
              onChange={(e) => this.setState({ star: 9 })}
              />
              <label htmlFor="vote5"> 9점</label>
              <input type="radio" name="vote" value="10" checked={this.state.star === 10}
              onChange={(e) => this.setState({ star: 10 })}
              />
              <label htmlFor="vote6"> 10점</label>              
            </div>
          </div>

          <div onClick={this.addMessageToDB} className="ui blue labeled submit icon button" >
            <i className="icon edit"></i>Add Comment
          </div>

        </form>
        
      
        <div className="ui divider hidden" />
        <div className="ui feed">
          <h3 className="ui dividing header">Comments 
            <em> ({this.state.messages.length})</em>
          </h3>
          <p>평점 :
              {`${starAverage(this.state.messages.map(message => message.star)).toFixed(1)}`}
              점 / 
              10.0점
          </p>
          {/* 
            해당 키값의 star들을 전부 배열로 map 이용 받아서 더하고나누기.  
            입력시 자동 업데이트             
            {`${starAverage(this.state.messages.map(message => message.star))}`}
            소수점1자리 반올림 num.toFixed(1)           
          */}                 
          <div 
            className="ui comments"  
          >
          {this.state.messages.map((message, i) => {
            return (
            <div className="comment">
              <a className="avatar">
                <img src={message.photoUrl}/> 
              </a>
              <div className="content">
                <a className="author">{message.userName}</a>
                <div className="metadata">
                  <div className="date">{message.time}</div>
                  <div className="rating">
                    <i className="star icon"></i> 
                    {message.star}점
                  </div>
                </div>
                <div className="text">
                  {message.text}
                </div>
                
                  {
                    this.props.currentUser.name === message.userName ? (
                  <div className="actions">
                      <a 
                        className="edit"
                        onClick={() => {
                          // 수정 누르면 일단 기존글 자리에 입력창? 맵으로 돌고있는데 어디에?
                          // 그뒤 확인 버튼이 나오고 눌렀을때 업데이트   
                        }}
                      >
                        Edit
                      </a>
                      <a
                        className="delete"
                        onClick={() => {
                        console.log(message.id)
                        database.ref('/messages' + '/' + this.props.movieid).child(message.id).remove();   
                        //firebase삭제방법  child(키값).remove();                     
                      }}
                    >
                      Delete
                    </a>
                </div>
                    ) : (
                      null
                    )
                  }

              </div>
            </div>
            )
          })}
          </div>
        </div>
      </div>
    )
  }
}

/*
firebaes 수정 https://firebase.google.com/docs/database/web/save-data

로그인한 상태가 아닐때 currentUser가 없을때 if문 이나
{currentUser.name === '' ? ():()}  
입력하려고 하면 팝업 아니면 로그인 or 경고택스트 표시                           


/*
조건부(삼항) 연산자
test ? expression1 : expression2
{ A === B ? ( e1 ):( e2 )}
()=>{
  //window.open("", "팝업", "left=10, top=10, width=200,height=100");
  //alert('로그인이 필요합니다');
}


var num = new Array(3,4,6);              
starAverage(array) => {
  for (i=0; i<array.lengty; i++)
    sum += array[i];
  return sum /array.length;    
}

console.log(starAverage)

function average(array){
  var result = 0;
  var arrLength = array.length;
  for(var i = 0; i < arrLength; i++){
    result += array[i];
  }
  return result/arrLength;
}


//ES6문법
//for of문을 사용하여 각 배열 값이 자동으로 더해지게 

var starAverage = (array) => {
  let result = 0;
  for(let item of array){
    result += item;
  }
  return result/array.length;
}
var starArray = [5,3,4]
console.log("평균값 : " + starAverage(starArray));


*/