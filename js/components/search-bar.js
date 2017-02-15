import React from 'react';
import autoBind from 'react-autobind';
import { browserHistory } from 'react-router';

class SearchBar extends React.Component {
  constructor(){
    super();
    autoBind(this);
  }
  handleSubmit(e){
    e.preventDefault();
    browserHistory.push(`/search/${this.refs.search.value}`)
  }
  render(){
    return (
      <form className="navbar-form navbar-left" onSubmit={this.handleSubmit}>
        <input className="form-control" placeholder="Search" type="text" name="search" ref="search"/>
        <button className="btn btn-warning left10" type="submit">Search</button>
      </form>
    )
  }
}

export default SearchBar;