import React from 'react';
import autoBind from 'react-autobind'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import _ from 'lodash';

import {loadMoviesByGenre, loadTVByGenre} from '../actions'

import Questions from './questions'

class GameBoard extends React.Component {
    constructor(){
        super()
        autoBind(this)
        this.state = {
            qty: 5
        }
    }
    componentWillMount(){
        this.loadMovies()
    }
    componentWillUnmount(){
        this.props.clearMovies()
    }
    loadMovies(){
        let page;
        switch(this.props.game.difficulty){
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
        if(this.props.game.type==='movie'){
            this.props.loadMoviesByGenre(this.props.routeParams.category_id, page)
        }else{
            this.props.loadTVByGenre(this.props.routeParams.category_id, page)
        }
    }
    retry(){
        this.loadMovies()
    }
    render(){
        let content;
        switch(this.props.movie_status){
            case "failed":{
                content = <button className="btn-lg btn-danger col-md-6 col-sm-6 center-block" onClick={this.retry}>Retry</button>;
                break;
            }
            case "complete":{
                content = <Questions movies={this.props.movies} movie_page={this.props.page} qty={this.state.qty} details_loaded={this.props.details_loaded} activePlayer={1}/>;
                break;
            }
            default:{
                content = null
                break;
            }
        }
        return(
            <div className="game-board">
                {content}
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
        movies: state.movies.movies,
        movie_status: state.movies.status,
        page: state.movies.page,
        details_loaded: state.movies.details_loaded,
        game: state.game
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loadMoviesByGenre: loadMoviesByGenre,
        loadTVByGenre: loadTVByGenre,
        clearMovies:()=>dispatch({type:"CLEAR_MOVIES",payload:[]})}
        ,dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(GameBoard);