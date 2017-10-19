import React from 'react';
import {
  database,
} from '../firebase'


export default class Comment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: '',
    }
  }

  onTextChange = (e) => {
    this.setState({
      message: e.target.value,
    })
  }

  addMessageToDB= (e) => { //form에 submit 
    e.preventDefault();  
    const message = {
      text : this.state.message,
      userName : this.state.currentUser.name 
    }
    database.ref('/messages').push(message);   
    this.setState({
      message:'',
    })
  }


  render = () => {
    return (
      <div className="ui container">

        <form onSubmit={this.addMessageToDB} className="ui form">
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
          <div className="ui blue labeled submit icon button">
            <i className="icon edit"></i>Add Comment
          </div>
        </form>
        
        <div className="ui divider hidden" />
        <div className="ui feed">
          <h3 className="ui dividing header">Comments 1</h3>
          <div className="ui comments">
            <div className="comment">
              <a className="avatar">
                <img src="https://semantic-ui.com/images/avatar/small/joe.jpg"/> 
              </a>
              <div className="content">
                <a className="author">Tom Lukic</a>
                <div className="metadata">
                  <div className="date">2 days ago</div>
                  <div className="rating">
                    <i className="star icon"></i>
                    7.5 
                  </div>
                </div>
                <div className="text">
                I don't really want to talk too much about the film's plot or the finale as not much about the film is known t... read the rest.
                </div>
                <div className="actions">
                  <a className="edit">Edit</a>
                  <a className="delete">Delete</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}



/*

import laura from '../images/avatar/small/laura.jpg';
      <img src={laura}/>



event반복
src/images/avatar/small/jenny.jpg 연결(x) 로그인한 프로필 사진

      <div className="ui container">

        <form onSubmit={this.addMessageToDB} className="ui form">
          <div className="field">
            <label>Comment</label>
            <textarea rows="3"></textarea>
          </div>
          <div className="ui blue labeled submit icon button">
            <i className="icon edit"></i>Add Comment
          </div>
        </form>
        
        <div className="ui divider hidden" />
        <div className="ui feed">
          <h3 className="ui dividing header">Comments 1</h3>
          <div className="ui comments">
            <div className="comment">
              <a className="avatar">
                 <img src="https://semantic-ui.com/images/avatar/small/joe.jpg"/>
                </a>
                <div className="content">
                  <a className="author">Tom Lukic</a>
                  <div className="metadata">
                    <div className="date">2 days ago</div>
                    <div className="rating">
                      <i className="star icon"></i>
                      7.5 
                    </div>
                  </div>
                  <div className="text">
                  I don't really want to talk too much about the film's plot or the finale as not much about the film is known t... read the rest.
                  </div>
                  <div className="actions">
                    <a className="edit">Edit</a>
                    <a className="delete">Delete</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
*/

/*
          <div className="event">
            <div className="label">
              <img src="https://semantic-ui.com/images/avatar/small/joe.jpg" />
            </div>
            <div className="content">
              <div className="summary">
                <a>Joe Henderson</a>
                <div className="metadata">
                  <div className="date">2 days ago</div>
                  <div className="rating">
                    <i className="star icon"></i>
                    5 Faves
                  </div>
                </div>
              </div>
              <div className="extra text">
                Ours is a life of constant reruns. We're always circling back to where we'd we started, then starting all over again. Even if we don't run extra laps that day, we surely will come back for more of the same another day soon.
              </div>
              <div className="meta">
                <a className="star">
                  <i className="star icon"></i> 5.0
                </a>
              </div>
            </div>
          </div>
*/