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
    handleNewGame(type,difficulty){
        this.setState({
            started: true,
            difficulty: difficulty
        })
        this.props.dispatch({type:"START_NEW_GAME",payload:{difficulty:difficulty,type:type}})
        browserHistory.push(`/categories`)
    }
    render(){
        return(
            <div className="row">
                <div className="center-block">
                    <h1 className="text-center">Select Game Mode and Difficulty</h1>
                    <div className="col-md-6 col-sm-6" style={{marginTop:'30px'}}>
                        <h1 className="text-center">Movie Trivia</h1>
                        <button className="btn btn-info col-md-12 col-sm-12 difficulty-btn" onClick={this.handleNewGame.bind(null,'movie','easy')}>EASY</button>
                        <button className="btn btn-primary col-md-12 col-sm-12 difficulty-btn" onClick={this.handleNewGame.bind(null,'movie','normal')}>NORMAL</button>
                        <button className="btn btn-warning col-md-12 col-sm-12 difficulty-btn" onClick={this.handleNewGame.bind(null,'movie','hard')}>HARD</button>
                        <button className="btn btn-danger col-md-12 col-sm-12 difficulty-btn" onClick={this.handleNewGame.bind(null,'movie','extreme')}>EXPERT</button>
                    </div>
                    <div className="col-md-6 col-sm-6" style={{marginTop:'30px'}}>
                        <h1 className="text-center">TV Trivia</h1>
                        <button className="btn btn-info col-md-12 col-sm-12 difficulty-btn" onClick={this.handleNewGame.bind(null,'tv','easy')}>EASY</button>
                        <button className="btn btn-primary col-md-12 col-sm-12 difficulty-btn" onClick={this.handleNewGame.bind(null,'tv','normal')}>NORMAL</button>
                        <button className="btn btn-warning col-md-12 col-sm-12 difficulty-btn" onClick={this.handleNewGame.bind(null,'tv','hard')}>HARD</button>
                        <button className="btn btn-danger col-md-12 col-sm-12 difficulty-btn" onClick={this.handleNewGame.bind(null,'tv','extreme')}>EXPERT</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect()(StartPage);