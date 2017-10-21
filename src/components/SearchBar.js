import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Autosuggest from 'react-autosuggest';
import { URL_SEARCH, API_KEY_ALT } from '../config';
import theme from './SearchBar.css'
import {
  withRouter,
} from 'react-router-dom';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: []
    };
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

  handleKeyDown = (event) => {
    if (event.key == 'Enter') {
      return this.handleSubmit(this.state.value);
    }
  }

  handleSubmit = (searchText) => {
    this.props.dispatch(push('/search/' + searchText));
    this.setState({ value: '' });
  }


  getSuggestionValue = (suggestion) => {
    return suggestion.title;
  };

  onSuggestionsFetchRequested = ({ value }) => {
    const trimmedValue = value.trim();

    if (trimmedValue.length > 0) {
      let url = URL_SEARCH + trimmedValue + API_KEY_ALT;
      fetch(url)
        .then(response => response.json())
        .then(json => json.results)
        .then(data => {
          const results = data.map(movie => {
            let temp = {}
            temp.id = movie.id
            temp.title = movie.title
            temp.year = (movie.release_date == "") ? "0000" : movie.release_date.substring(0, 4)
            return temp
          });
          this.setState({
            suggestions: results
          });
        }).catch(error => console.log('Exception to get Suggestions'))
    }
    else {
      this.setState({
        suggestions: []
      })
    }
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  renderSuggestion = (suggestion) => {
    return (
      <a>
        <div className="searchResult-text">
          <div className="searchResult-name">
            {suggestion.title}
          </div>
          {suggestion.year}
        </div>
      </a>
    );
  };

  onSuggestionSelected = (event, { suggestion, method }) => {
    if (method === 'enter')
      event.preventDefault();
      this.props.history.push('/movie-detail/' + suggestion.id);
    // this.props.dispatch(push('/movie/' + suggestion.id));
    this.setState({ value: '' });
  };

  render() {

    const { value, suggestions } = this.state;
    const inputProps = {
      value,
      onChange: this.onChange,
      onKeyPress: this.handleKeyDown,
      placeholder: 'Search Movie Title...'
    };

    return (
      <div>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionSelected={this.onSuggestionSelected}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps} />
      </div>
    );

  }
}

export default withRouter(SearchBar);