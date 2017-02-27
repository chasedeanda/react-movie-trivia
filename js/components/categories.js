import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import autoBind from 'react-autobind';
import {browserHistory} from 'react-router';

import { loadMovieGenres, loadTVGenres } from '../actions';

class Categories extends React.Component{
    constructor(){
        super()
        autoBind(this);
    }
    componentWillMount(){
        if(this.props.game.type==='movie'){
            this.props.loadMovieGenres()
        }else{
            this.props.loadTVGenres()
        }
        
    }
    handleCategoryClick(category_id){
        browserHistory.push(`/categories/${category_id}`)
    }
    render(){
        let categories = this.props.genres.map((g,key) => {
            return (<button className="btn btn-primary pull-left genre-btn" onClick={this.handleCategoryClick.bind(null, g.id)} key={g.id}>{g.name}</button>)
        })
        return(
            <div className="row">
                <div className="center-block text-center">
                    <h1>{`${(this.props.game.type==='movie')?"Movie":"TV"} Trivia`}</h1>
                    <span>Select a category</span><br/>
                    <div className="genre-cont">
                     {categories}
                    </div>
                </div>
            </div>
        )
    }
}

Categories.propTypes = {
    genres: React.PropTypes.array,
    game: React.PropTypes.object
}
Categories.defaultProps = {
    genres: []
}
function mapStateToProps(state) {
    return{
        genres: state.genres.genres,
        game: state.game
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loadMovieGenres: loadMovieGenres,
        loadTVGenres: loadTVGenres
    },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Categories);