import React from 'react';
import autoBind from 'react-autobind';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';

import { getMovie } from '../actions'

import { IMAGE_BASE_BACKDROP } from '../constants'


class MovieDetails extends React.Component{
  constructor(){
    super()
    autoBind(this)
  }
  componentWillMount(){
    this.props.getMovie(this.props.params.id)
  }
  render(){
    let {movie} = this.props || {};
    if(!movie){
      return <div>Loading...</div>
    }
    return(
      <div>
        <div className="row">
          <img key={movie.id} className="banner-img" src={`${IMAGE_BASE_BACKDROP}${movie.backdrop_path}`}/>
        </div>
        <div className="row">
          <ul>
            <li>{movie.original_title}</li>
            <li>Released: {movie.release_date}</li>
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    movie: state.movies.movies[0]
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({getMovie: getMovie}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(MovieDetails);

/*

{
	"adult": false,
	"backdrop_path": "/ndlQ2Cuc3cjTL7lTynw6I4boP4S.jpg",
	"belongs_to_collection": null,
	"budget": 175000000,
	"genres": [
		{
			"id": 28,
			"name": "Action"
		},
		{
			"id": 80,
			"name": "Crime"
		},
		{
			"id": 14,
			"name": "Fantasy"
		}
	],
	"homepage": "http://www.suicidesquad.com/",
	"id": 297761,
	"imdb_id": "tt1386697",
	"original_language": "en",
	"original_title": "Suicide Squad",
	"overview": "From DC Comics comes the Suicide Squad, an antihero team of incarcerated supervillains who act as deniable assets for the United States government, undertaking high-risk black ops missions in exchange for commuted prison sentences.",
	"popularity": 19.082982,
	"poster_path": "/e1mjopzAS2KNsvpbpahQ1a6SkSn.jpg",
	"production_companies": [
		{
			"name": "Dune Entertainment",
			"id": 444
		},
		{
			"name": "Atlas Entertainment",
			"id": 507
		},
		{
			"name": "Warner Bros.",
			"id": 6194
		},
		{
			"name": "DC Entertainment",
			"id": 9993
		}
	],
	"production_countries": [
		{
			"iso_3166_1": "CA",
			"name": "Canada"
		},
		{
			"iso_3166_1": "US",
			"name": "United States of America"
		}
	],
	"release_date": "2016-08-03",
	"revenue": 739623924,
	"runtime": 123,
	"spoken_languages": [
		{
			"iso_639_1": "en",
			"name": "English"
		}
	],
	"status": "Released",
	"tagline": "Worst Heroes Ever",
	"title": "Suicide Squad",
	"video": false,
	"vote_average": 5.9,
	"vote_count": 2112
}

*/