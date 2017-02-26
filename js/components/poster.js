import React from 'react';
import { Link } from 'react-router';
import * as CONSTANTS from '../constants.js';
const { IMAGE_BASE_POSTER } = CONSTANTS;

class Poster extends React.Component{
  render(){
    return(
      <div style={{marginTop:'30px'}}>
        <div className="movie clearfix">
          <div className="img" style={{backgroundImage:`url(${IMAGE_BASE_POSTER}${this.props.movie.poster_path})`}}/>
          <h3 style={{position:'relative',top:'10px'}}>
            {(this.props.correct)?
            <span>
                Correct&nbsp;
                <span className="glyphicon glyphicon-ok" style={{color:'green',position:'relative',top:'2px',left:'6px'}}></span>
            </span>
            :
            <span>
                Wrong&nbsp;
                <span className="glyphicon glyphicon-remove" style={{color:'red',position:'relative',top:'6px',left:'6px'}}></span>
            </span>}
            </h3>
        </div>
      </div>
    )
  }
}
Poster.propTypes = {
  movie: React.PropTypes.object
}
export default Poster;