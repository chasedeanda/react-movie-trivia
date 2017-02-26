import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import autoBind from 'react-autobind'

import SearchBar from './search-bar'

class Header extends React.Component{
  constructor(){
      super()
      autoBind(this);
  }
  render(){
    return(
      <div>
        <nav className="navbar navbar-default navbar-static-top">
          <div className="container-fluid">
              <div className="navbar-header">
                  <Link to="/"><h3><span className="glyphicon glyphicon-film"></span> Movie Trivia</h3></Link>
              </div>
          </div>
      </nav>
      
      {this.props.players.player1.name&&this.props.players.player2.name?
        <div className="text-center">
          <h4><strong>{`${this.props.players.player1.name} VS ${this.props.players.player2.name}`}</strong></h4>
        </div>
      : null}
    </div>
    )
  }
}

class Footer extends React.Component{
  render(){
    return(
      <div className="row">
        <a className="footer-link" href="https://github.com/chasedeanda/react-movie-trivia">
          View full project on <span className="glyphicon glyphicon-tree-conifer"></span> GitHub
        </a>
      </div>
    )
  }
}

class Layout extends React.Component{
  render(){
    return(
      <div>
        <Header players={this.props.players}/>
        <div className="container">
          {this.props.children}
        </div>
        {/*<Footer/>*/}
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    players: state.players
  }
}
export default connect(mapStateToProps)(Layout);