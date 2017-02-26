import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Movie from './movie'

class MovieList extends React.Component {
  render(){
    let movies = this.props.movies.map((movie,key)=>{
      return  <Movie movie={movie} key={key}/>
    })
    if(this.props.movies.length <1){
      return <div>No results</div>
    }
    return(
      <div>
        {movies}
      </div>
    )
  }
}

MovieList.propTypes = {
  movies: React.PropTypes.array
}

export default MovieList;