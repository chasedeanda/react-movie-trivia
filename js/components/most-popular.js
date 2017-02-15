import React from 'react';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';
import {bindActionCreators} from 'redux';

import { getMostPopular } from '../actions';
import Movie from './movie';

class MostPopular extends React.Component{
  constructor(){
    super()
    autoBind(this);
  }
  componentWillMount(){
    this.props.getMostPopular();
  }
  render(){
    let mostPopular = this.props.movies.map((movie,key)=>{
      return <Movie movie={movie} key={key}/>;
    });
    if(this.props.fetching){
      return <div>Loading...</div>
    }
    return(
      <div className="row">
        <h1><span className="glyphicon glyphicon-fire"></span> Hot Movies</h1>
        {mostPopular}
      </div>
    )
  }
}

MostPopular.propTypes = {
  movies: React.PropTypes.array
}
function mapStateToProps(state){
  return{
    fetching: state.mostPopular.fetching,
    movies: state.mostPopular.movies
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({getMostPopular: getMostPopular},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(MostPopular);
