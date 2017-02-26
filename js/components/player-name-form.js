import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import autoBind from 'react-autobind';
import {browserHistory} from 'react-router';

import { changePlayerName } from '../actions';

class PlayerNameForm extends React.Component{
    constructor(){
        super()
        autoBind(this);
    }
    handlePlayerNameChange(e){
        e.preventDefault();
        this.props.changePlayerName('1',this.refs.player1Name.value)
        this.props.changePlayerName('2',this.refs.player2Name.value)
        browserHistory.push(`/categories`)
    }
    render(){
        return(
            <div className="row">
                <div className="col-md-6 center-block">
                    <form onSubmit={this.handlePlayerNameChange}>
                        <div className="col-md-12 col-sm-12 form-group">
                            <h2>Enter Player 1 Name</h2>
                            <input type="text" className="center-block form-control" defaultValue="Player 1" placeholder="Enter Name" ref="player1Name" required/><br/>
                            <h2>Enter Player 2 Name</h2>
                            <input type="text" className="center-block form-control" defaultValue="Player 2" placeholder="Enter Name" ref="player2Name" required/>
                        </div>
                        <button type="submit" className="col-md-12 col-sm-12 center-block btn-lg btn-info">Continue ></button>
                    </form>
                </div>
            </div>
        )
    }
}

PlayerNameForm.propTypes = {
    players: React.PropTypes.object
}
PlayerNameForm.defaultProps = {
    players: {}
}
function mapStateToProps(state) {
    return{
        players: state.players
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({changePlayerName: changePlayerName}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(PlayerNameForm);