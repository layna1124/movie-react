import React from 'react'


export default class CurrentUser extends React.Component {
  renderLoginMode = () => {
    return (
      <div className="nav-right nav-menu">
        <figure
          className="image is-48x48"
          style={{display: 'inline-block', margin: '0px',}}
        >
          <img
            src={this.props.currentUser.photoUrl}
            style={{
              marginTop: '3px',
              borderRadius: '100%',
              width: '48px',
              height:'48px',
            }}
          />
        </figure>
        <a className="nav-item">
          {this.props.currentUser.name}님 안녕하세요
        </a>
        <a
          className="nav-item"
          onClick={this.props.logoutHandler}
          style={{cursor: 'pointer',}}
        >
          로그아웃
        </a>
      </div>
    )
  }

  renderSignoutMode = () => {
    return (
      <div className="nav-right nav-menu">
        <a
          className="nav-item"
          onClick={this.props.loginHandler}
          style={{cursor: 'pointer',}}
        >
          구글로로그인
        </a>
      </div>
    )
  }

  render() {
    if (this.props.currentUser.name) {
      return this.renderLoginMode();
    }
    return this.renderSignoutMode();
  }
}
