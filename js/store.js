import { createStore } from 'redux';
import moviesReducer from './reducers/movies.js';

const store = createStore(moviesReducer, {
  movies: []
})

store.subscribe(()=>{
  console.log('change ',store.getState())
})

store.dispatch({type: "INC", payload: [
    {
      "poster_path": "/bZUbpjwnarSHJK40W9sGpyedWhx.jpg",
      "adult": false,
      "overview": "A young teenager named Mikey Walsh finds an old treasure map in his father's attic. Hoping to save their homes from demolition, Mikey and his friends Data Wang, Chunk Cohen, and Mouth Devereaux run off on a big quest to find the secret stash of Pirate One-Eyed Willie.",
      "release_date": "1985-06-06",
      "genre_ids": [
        12,
        35,
        10751
      ],
      "id": 9340,
      "original_title": "The Goonies",
      "original_language": "en",
      "title": "The Goonies",
      "backdrop_path": "/qKeyO9gXaaK0g87tvvqOPK1siwc.jpg",
      "popularity": 2.685506,
      "vote_count": 789,
      "video": false,
      "vote_average": 7.16
    },
    {
      "poster_path": "/7phNMrYlNw70xtY4WLkLaRs7zKc.jpg",
      "adult": false,
      "overview": "A retrospective documentary of the cult classic movie The Goonies. Including interviews with the cast, exploration of the film's locations and unique stories you wont hear anywhere else.",
      "release_date": "2010-07-13",
      "genre_ids": [
        99
      ],
      "id": 413173,
      "original_title": "Making of a Cult Classic: The Unauthorized Story of 'The Goonies'",
      "original_language": "en",
      "title": "Making of a Cult Classic: The Unauthorized Story of 'The Goonies'",
      "backdrop_path": null,
      "popularity": 1.001304,
      "vote_count": 0,
      "video": false,
      "vote_average": 0
    }
  ]})