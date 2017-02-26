import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import autoBind from 'react-autobind';
import {browserHistory} from 'react-router';

import { loadGenres } from '../actions';

class Categories extends React.Component{
    constructor(){
        super()
        autoBind(this);
    }
    componentWillMount(){
        this.props.loadGenres()
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
                    <h1>Movie Trivia</h1>
                    <span>Select a category</span><br/>
                    <div className="col-md-10 col-sm-10 center-block">
                     {categories}
                    </div>
                </div>
            </div>
        )
    }
}

Categories.propTypes = {
    genres: React.PropTypes.array
}
Categories.defaultProps = {
    genres: []
}
function mapStateToProps(state) {
    return{
        genres: state.genres.genres
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({loadGenres: loadGenres},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Categories);