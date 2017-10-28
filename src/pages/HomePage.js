import React from 'react';
import MainCarousel from '../components/MainCarousel';
import NowPlaying from '../components/NowPlaying';

export default class Home extends React.Component {

  render = () => {
    return (
      <div className="ui container">
        <MainCarousel />
        {/*모양다르니까 각각*/}
        <NowPlaying />
        <div className="ui large header">Top Rated Movies(6)</div>       
      </div>
    )
  } 
}

