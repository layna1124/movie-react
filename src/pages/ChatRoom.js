import React from 'react'
import {
  database,
  googleProvider,
  auth,
} from '../firebase';
import map from 'lodash/map';


const tileClasses = [
  'danger',
  'primary',
  'info',
  'success',
  'warning',
];


export default class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chat: '', 
      chats: [],
      currentUser: {
        name:'', // user.displayName 
        photoUrl:'', // user.photoUrl
        email:'', // user.email
      }
    }
  }
   
  // 내상태값변할때마다 스테이트 업데이트 
  getChatsFromDB = () => {
    database.ref("/chats").on('value', (snapshot) => {
      this.setState({
        chats: map(snapshot.val(), (chat => chat))
      })
    })    
  }

  // scroll은 비동기 글추가되고나서 화면.  왜 에러 ?
  // 
  componentDidUpdate = (prevProps, prevState) => {
    if(prevState.chats.length !== this.state.chats.length){
      document.getElementById("chatbox").scrollTop = document.getElementById("chatbox").scrollHeight;
    }
  }


  componentDidMount = () => { 
    database.ref('/chats').on('value', (snapshot) => {  //감지위치가 같아야 
      this.setState({ //chat를 인자로 받아서 우리의 로컬한 메시지스로 넣어줌 
        chats: map(snapshot.val(), (chat => chat)) // 
      })
    })

  }
  onTxtChange = (e) => {
    //현대스테이트 바꿔줌
    this.setState({
      chat: e.target.value,
    })
  }


  addchatToDB= (e) => { //form에 submit 
    e.preventDefault(); //엔터이벤트는 감지하면서 새로고침 막아야  
    const currentTime = new Date(); //실제메시지 구성 
    const chat = {
      text : this.state.chat,
      time : currentTime.toLocaleTimeString(), //시간new Date()'2017-10-03'
      userName : this.state.currentUser.name //
    }
    database.ref('/chats').push(chat); 
    //파이어베이스에서 보면 전체아니고 /mesmsages만 가져옴
    //사소한거 바꿔도 전체바뀌니까. 좁히는것 

    this.setState({
      chat:'',
    })
  }
  

  render() {
    return (
      <div className="ui container">
        <div
          style={{  }}
        >
          <h1 className="ui large header">챗:앱</h1>
        </div>
        <div id="chatbox" style={{ height: '300px', border: '2px solid #aaa', overflow: 'scroll', }}>
          {this.state.chats.map((chat, i) => {
            return (
              <div className="tile is-parent">
                <article className={`tile is-child notification is-${tileClasses[i%5]}`}>
                  <span className="">{chat.text}</span>
                  <em className="">{chat.time}</em>
                  <small className="">{chat.userName}</small>
                </article>
              </div>
            )
          })}
        </div>
        <div style={{ }}>
          <footer className="footer" style={{ padding: '24px', backgroundColor: 'white' }}>
            <div className="">
              <div className="">
                
                <form onSubmit={this.addchatToDB}>
                <div class="field">
                  <div className="control">
                    <input 
                      className="input is-large" 
                      type="text" 
                      placeholder="챗입력" 
                      onChange ={this.onTxtChange}
                      value={this.state.chat}
                      style={{width: '100%', backgroundColor: '#fafafa' }}
                    />      
                  </div>
                </div>
                </form>
              </div>
              
            </div>
          </footer>
        </div>
      </div>
    );
  }
}
