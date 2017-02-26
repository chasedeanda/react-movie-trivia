import React from 'react';
import autoBind from 'react-autobind'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import _ from 'lodash';

import {loadMoviesByGenre} from '../actions'

import Questions from './questions'

class GameBoard extends React.Component {
    constructor(){
        super()
        autoBind(this)
    }
    componentWillMount(){
        let difficulty = localStorage.getItem('difficulty') || 'normal',
            page;
        switch(difficulty){
            case 'easy':{
                page = 1
                break;
            }
            case 'normal':{
                page = Math.floor((Math.random() * 4) + 1)
                break;
            }
            case 'hard':{
                page = Math.floor((Math.random() * 100) + 1)
                break;
            }
            case 'extreme':{
                page = Math.floor((Math.random() * 225) + 1)
                break;
            }
        }
        this.props.loadMoviesByGenre(this.props.routeParams.category_id, page)
    }
    componentWillUnmount(){
        this.props.clearMovies()
    }
    render(){
        return(
            <div className="game-board">
                <Questions movies={this.props.movies} qty={5} activePlayer={1}/>
            </div>
        )
    }
}
GameBoard.propTypes = {
    movies: React.PropTypes.array
}
GameBoard.defaultProps = {
    movies: []
}
function mapStateToProps(state) {
    return{
        movies: state.movies.movies
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loadMoviesByGenre: loadMoviesByGenre,
        clearMovies:()=>dispatch({type:"CLEAR_MOVIES",payload:[]})}
        ,dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(GameBoard);