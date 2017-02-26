import React from 'react';
import autoBind from 'react-autobind';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';

import { searchMovies } from '../actions'
import MovieList from './movie-list.js';

class SearchResults extends React.Component{
  constructor(){
    super()
    autoBind(this)
  }
  componentWillMount(){
    this.props.searchMovies(this.props.params.query)
  }
  componentWillReceiveProps(nextProps){
    if(this.props.params.query != nextProps.params.query)
      this.props.searchMovies(nextProps.params.query)
  }
  render(){
    return(
      <MovieList movies={this.props.movies}/>
    )
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({searchMovies: searchMovies}, dispatch)
}
function mapStateToProps(state){
  return {
    movies: state.movies.movies
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(SearchResults);