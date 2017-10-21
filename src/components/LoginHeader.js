import React from 'react'
import CurrentUser from './CurrentUser'

export default class LoginHeader extends React.Component {
  render() {
    return (
      <CurrentUser
      currentUser={this.props.currentUser}
      loginHandler={this.props.loginHandler}
      logoutHandler={this.props.logoutHandler}
    />
  );}
}  