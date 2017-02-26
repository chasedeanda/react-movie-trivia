import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import autoBind from 'react-autobind';
import {browserHistory} from 'react-router';

import PlayerNameForm from './player-name-form';

import { loadGenres } from '../actions';

class StartPage extends React.Component{
    constructor(){
        super()
        autoBind(this);
        this.state = {
            started: false
        };
    }
    handleNewGame(difficulty){
        this.setState({
            started: true,
            difficulty: difficulty
        })
        localStorage.setItem('difficulty',difficulty)
        browserHistory.push(`/categories?difficulty=${difficulty}`)
    }
    render(){
        return(
            <div className="row">
                <div className="center-block">
                    <h1 className="text-center">Movie Trivia</h1>
                    <div className="col-md-6 col-sm-10 center-block" style={{marginTop:'30px'}}>
                        <button className="btn btn-info col-md-12 col-sm-12 difficulty-btn" onClick={this.handleNewGame.bind(null,'easy')}>EASY</button>
                        <button className="btn btn-primary col-md-12 col-sm-12 difficulty-btn" onClick={this.handleNewGame.bind(null,'normal')}>NORMAL</button>
                        <button className="btn btn-warning col-md-12 col-sm-12 difficulty-btn" onClick={this.handleNewGame.bind(null,'hard')}>HARD</button>
                        <button className="btn btn-danger col-md-12 col-sm-12 difficulty-btn" onClick={this.handleNewGame.bind(null,'extreme')}>EXPERT</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default StartPage;