import React from 'react'
import './Loader.css';


export default class Loader extends React.Component {
  render() {
    return (
      <div
        className="loader-wrapper"
      >
        <div className="loader">
          <div className="loader__bar"></div>
          <div className="loader__bar"></div>
          <div className="loader__bar"></div>
          <div className="loader__bar"></div>
          <div className="loader__bar"></div>
          <div className="loader__ball"></div>
        </div>
      </div>
    );
  }
}
