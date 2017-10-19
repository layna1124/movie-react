import React from 'react';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';

export default class Home extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render = () => {
    return (
      <div className="ui container">
        <div className="ui large header">Main Slide</div>
        <div className="ui large header">Now Playing</div>
        <div className="ui large header">Top Rated Movies</div>
        
      </div>
    )
  } 
}

// return(
//   <div>
//     Main MainPage

//   </div>  
// );