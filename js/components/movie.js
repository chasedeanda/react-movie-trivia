import React from 'react';
import { Link } from 'react-router';
import * as CONSTANTS from '../constants.js';
const { IMAGE_BASE_POSTER } = CONSTANTS;

class Movie extends React.Component{
  render(){
    return(
      <Link to={`/details/${this.props.movie.id}`}>
        <div className="movie clearfix">
          <div className="img" style={{backgroundImage:`url(${IMAGE_BASE_POSTER}${this.props.movie.poster_path})`}}/>
        </div>
      </Link>
    )
  }
}
Movie.propTypes = {
  movie: React.PropTypes.object
}
export default Movie;