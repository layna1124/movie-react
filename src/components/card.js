import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
let backdropIMG;

export default class Card extends React.Component {

  render() {
    let data = this.props.data
    // if movie ID found, then...

    let posterIMG = 'https://image.tmdb.org/t/p/w500' + data.poster,
      production = data.production,
      productionCountries = data.production_countries,
      genres = data.genre,
      totalRevenue = data.revenue,
      productionList = nestedDataToString(production),
      productionCountriesList = nestedDataToString(productionCountries),
      noData = '-',
      genresList = nestedDataToString(genres);
      backdropIMG = 'https://image.tmdb.org/t/p/original' + data.backdrop;



    // conditional statements for no data
    if (data.vote === 'undefined' || data.vote === 0) {
      data.vote = noData
    } else {
      data.vote = data.vote + ' / 10'
    };


    if (data.poster == null) {
      posterIMG = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSols5HZxlQWyS9JY5d3_L9imbk0LiziHiyDtMZLHt_UNzoYUXs2g';
    }


    return (
      <div className="ui container">
        <div id="moviedetail-bg"></div>
        <div className="ui sixteen wide column centered stackable grid ">
          <div className="six wide column center aligned">
            <img id="postertest" className='poster max-w100' src={posterIMG} />
          </div>          
          <div className="ten wide column">
              <h1>{data.original_title}</h1>
              <span className="tagline">{data.tagline}</span>
              <p>{data.overview}</p>
              <div className="additional-details">
                <span className="genre-list">{genresList}</span>
                <span className="production-list">{productionList}</span>
                <div className="">
                  <div> Original Release: <span className="meta-data">{data.release}</span></div>
                  <div> Running Time: <span className="meta-data">{data.runtime} mins</span> </div>
                  <div> Vote Average: <span className="meta-data">{data.vote}</span></div>
                </div>
              </div>
              
          </div>
        </div>
      </div>
    )
  }
  componentDidUpdate() {
    //document.body.style.backgroundImage = 'url(' + backdropIMG + ')';
    document.getElementById("moviedetail-bg").style.backgroundImage = 'url(' + backdropIMG + ')';
  }
}


function nestedDataToString(nestedData) {
  let nestedArray = [],
    resultString;
    nestedArray.forEach(function (item, i) {
    nestedArray.push(item.name);
  });
  resultString = nestedArray.join(', '); // array to string
  return resultString;
};