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
    handleNewGame(){
        this.setState({
            started: true
        })
    }
    render(){
        return(
            <div className="row">
                <div className="center-block">
                    <h1 className="text-center">Movie Trivia</h1>
                    {!this.state.started?
                        <button className="btn-lg btn-success col-md-6 col-sm-6 center-block" onClick={this.handleNewGame}>New Game</button>
                    :   <PlayerNameForm/>}
                </div>
            </div>
        )
    }
}

export default StartPage;