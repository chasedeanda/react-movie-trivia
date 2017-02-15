import React from 'react'
import { Link } from 'react-router'

import SearchBar from './search-bar'

class Header extends React.Component{
  render(){
    return(
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container-fluid">
            <div className="navbar-header">
                <Link to="/"><h3><span className="glyphicon glyphicon-film"></span> Movie Buddy</h3></Link>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-8">
              <SearchBar/>
            </div>
        </div>
    </nav>
    )
  }
}

class Footer extends React.Component{
  render(){
    return(
      <div className="row">
        <a className="footer-link" href="https://github.com/chasedeanda/react-movie-search">
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
        <Header/>
        <div className="container">
          {this.props.children}
        </div>
        <Footer/>
      </div>
    )
  }
}

export default Layout;