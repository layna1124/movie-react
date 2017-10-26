import React from 'react';
import {
  database,
} from '../firebase'
import map from 'lodash/map' 


export default class Comment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messages: [], //db에서 받아올때  
      currentUser: {
        name:'', // user.displayName 정해진것 보고써놔야편해   
        photoUrl:'', // user.photoUrl
        email:'', // user.email
      }      
    }
  }

  //불러오기 
  //value 이벤트를 사용하여 이벤트 발생 시점에 특정 경로에 있던 내용의 정적 스냅샷을 읽을 수 있습니다
  //val() 메소드로 snapshot의 데이터를 검색
  getMessagesFromDB = () => {
    database.ref('/messages' + '/' + this.props.movieid).on('value', (snapshot) => {
      this.setState({
        messages: map(snapshot.val(), (message => message))
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


  onTextChange = (e) => {//input
    this.setState({
      message: e.target.value,
    })
  }

  addMessageToDB= () => { //form에 submit 
    console.log('send')
    const currentTime = new Date(); 
    const message = {
      time : currentTime.toLocaleTimeString(),
      text : this.state.message,
      userName : this.props.currentUser.name,
      photoUrl: this.props.currentUser.photoUrl, 
    } 
    database.ref('/messages' + '/' + this.props.movieid).push(message);   
    this.setState({
      message:'',
    })
  }


  render = () => {
    return (
      <div className="ui container">

        <form className="ui form">
          <div className="field">
            <label>Comment</label>
            <textarea
              onChange ={this.onTextChange}
              value={this.state.message}
              placeholder="입력하세요" 
              rows= "3"
            >
            </textarea>
          </div>
          <div onClick={this.addMessageToDB} className="ui blue labeled submit icon button" >
            <i className="icon edit"></i>Add Comment
          </div>
        </form>
        
        <div className="ui divider hidden" />
        <div className="ui feed">
          <h3 className="ui dividing header">Comments (개수)</h3>
          <div className="ui comments">
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
                    7.5 
                  </div>
                </div>
                <div className="text">
                  {message.text}
                </div>
                <div className="actions">
                  <a className="edit">Edit</a>
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


