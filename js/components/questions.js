import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import _ from 'lodash';
import * as CONSTANTS from '../constants.js';
const { IMAGE_BASE_BACKDROP,IMAGE_BASE_POSTER,EMPTY_QUESTION_ALTS } = CONSTANTS;

import {getMovie} from '../actions';

import Poster from './poster';

class Questions extends React.Component {
    constructor(){
        super()
        autoBind(this)
        this.state = {
            movies: [],
            questions_created: 0,
            questions_answered: 0,
            questions_complete: false,
            player_score:0
        }
    }
    componentWillUnmount(){
        this.props.clearQuestions()
    }
    componentDidMount(){
        this.init()
    }
    componentWillReceiveProps(nextProps){
        if(this.props.movie_page!==nextProps.movie_page||this.props.details_loaded!==nextProps.details_loaded||this.props.category_id!==nextProps.category_id){
            this.init()
        }
    }
    init(){
        if(this.props.movies.length>0){
            this.setState({
                original_movies: this.props.movies,
                movies: _.chunk(_.shuffle(this.props.movies),4)
            },()=>{
                this.generateQuestionType()
            })
        }
    }
    generateQuestion(type){
        let selected_chunk = this.state.movies[this.state.questions_answered],
            selected_movie = _.sample(selected_chunk),
            question = {};
        switch(type){
            case "title":{
                question = {
                    id: this.props.questions.length+1,
                    type: type,
                    text: `What is the name of this ${(this.props.game.type==='movie')?'movie':'tv show'}?`,
                    correct: null,
                    assigned_player: this.props.activePlayer,
                    answer: (this.props.game.type==='movie')?selected_movie.original_title:selected_movie.original_name,
                    selected_movie: selected_movie,
                    answered: false,
                    choice_options: selected_chunk.map((m)=>{
                                return (this.props.game.type==='movie')?m.original_title:m.original_name
                            })
                }
                break;
            }
            case "summary":{
                question = {
                    id: this.props.questions.length+1,
                    type: type,
                    text: `Which summary best describes this ${(this.props.game.type==='movie')?'movie':'tv show'}?`,
                    correct: null,
                    assigned_player: this.props.activePlayer,
                    answer: selected_movie.overview,
                    selected_movie: selected_movie,
                    answered: false,
                    choice_options: selected_chunk.map((m)=>{
                                return m.overview
                            })
                }
                break;
            }
            case "cast":{
                const name = (_.get(selected_movie,'cast[0].name')||"").replace('(voice)','');
                if(name){
                    question = {
                        id: this.props.questions.length+1,
                        type: type,
                        text: `Who is a lead actor in this ${(this.props.game.type==='movie')?'movie':'tv show'}?`,
                        correct: null,
                        assigned_player: this.props.activePlayer,
                        answer: name,
                        selected_movie: selected_movie,
                        answered: false,
                        choice_options: selected_chunk.map((m)=>{
                                    let name = (_.get(m,'cast[0]name')||"").replace('(voice)','');
                                    return (name.length>0)?name:_.shuffle(EMPTY_QUESTION_ALTS)[0]
                                })
                    }
                }else{
                    this.generateQuestionType()
                }
                console.log(question)
                break;
            }
            case "character":{
                let character = this.formatCharacterName(selected_movie);
                if(character){
                    question = {
                        id: this.props.questions.length+1,
                        type: type,
                        text: `Who is a lead character in this ${(this.props.game.type==='movie')?'movie':'tv show'}?`,
                        correct: null,
                        assigned_player: this.props.activePlayer,
                        answer: character,
                        selected_movie: selected_movie,
                        answered: false,
                        choice_options: selected_chunk.map((m)=>{
                                    return this.formatCharacterName(m)
                                })
                    }
                }else{
                    this.generateQuestionType()
                }
                console.log(question)
                break;
            }
        }
        this.setState({
            questions_created: this.state.questions_created+1
        })
        this.props.createQuestion(question);
    }
    formatCharacterName(selected_movie){
        let character = _.get(selected_movie,'cast[0].name')||"",
              name = _.get(selected_movie,'cast[0].name')||"",
              option;
        if(character.toLowerCase().indexOf("himself")>-1||character.toLowerCase().indexOf("herself")>-1||character.toLowerCase().indexOf("narrator")>-1){
            option = name.replace(" (voice)","")
        }else{
         option = character.replace(" (voice)","")
        }
        if(option.length===0){
            option = _.shuffle(EMPTY_QUESTION_ALTS)[0]
        }
        return option;
    }
    updateQuestionsAnswered(question){
        this.setState({
            questions_answered: this.state.questions_answered+1
        },()=>{
            this.props.updateQuestion(question)
            if(this.state.questions_created<this.props.qty){
                this.generateQuestionType()
            }else{
                setTimeout(()=>{
                    this.tallyFinalScore()
                },500)
            }
        })
    }
    tallyFinalScore(){
        let correct = this.props.questions.filter((q)=>{
            return q.assigned_player===this.props.activePlayer&&q.answered&&q.correct
        }).length
        this.setState({
            questions_complete: true,
            player_score: correct
        })
    }
    goTo(route){
        browserHistory.push(route)
    }
    generateQuestionType(){
        let questionTypes = ["title","summary","cast","character"]
        this.generateQuestion(_.shuffle(questionTypes)[0])
    }
    render(){
        let unanswered_questions = this.props.questions.filter((q)=>{
            return !q.answered
        }),
        questions = unanswered_questions.map((q,key)=>{
            return <Question question={q} updateQuestionsAnswered={this.updateQuestionsAnswered} difficulty={this.props.game.difficulty} key={key}/>
        });
        
        return (
            <div>
                {(!this.state.questions_complete)?
                    questions
                :
                    <div>
                        <h1 className="text-center">You got {this.state.player_score} out {this.props.qty} correct</h1>
                        <QuestionGallery questions={this.props.questions}/>
                        <div className="col-md-6 col-sm-6 center-block text-center">
                            <button className="btn-lg btn-success" onClick={this.goTo.bind(null,"/categories")}>Play Again</button>
                            <button className="btn-lg btn-danger" style={{marginLeft:'20px'}} onClick={this.goTo.bind(null,'/')}>Main Menu</button>
                        </div>
                    </div>}
            </div>
        )
    }

}
Questions.propTypes = {
    questions: React.PropTypes.array,
    movies: React.PropTypes.array,
    getMovie: React.PropTypes.func
}
class Question extends React.Component {
    constructor(){
        super()
        autoBind(this)
        this.state = {
            answer: ""
        }
    }
    handleSubmit(e){
        e.preventDefault();
        let question = {
            id: this.props.question.id,
            answered: true,
            correct: (this.state.answer===this.props.question.answer)
        }
        this.props.updateQuestionsAnswered(question);
    }
    render(){
        let q = this.props.question,
            options = q.choice_options.map((o,i)=>{
                return <button className="btn-lg btn-info option-btn text-center" style={{margin:'5px'}} onClick={(e)=>this.setState({answer: o})} key={o+i}>{o}</button>
            }),
            text_question;
        switch(this.props.difficulty){
            case "easy":{
                text_question = false
                break;
            }
            case "normal":{
                text_question = (Math.floor((Math.random() * 64) + 1)===64)
                break;
            }
            case "hard":{
                text_question = (Math.floor((Math.random() * 24) + 1)===24)
                break;
            }
            case "extreme":{
                text_question = (Math.floor((Math.random() * 8) + 1)===8)
                break;
            }
            default:{
                text_question = false;
                break;
            }
        }
        return (
            <div>   
                <div className="col-md-10 center-block">
                    {(q.selected_movie.backdrop_path||text_question)?
                        <img src={`${IMAGE_BASE_BACKDROP}${q.selected_movie.backdrop_path}`} style={{width:'65%',display:'block',margin:'0 auto'}}/>
                    : <p style={{display:'block',margin:'auto',textAlign:'center'}}>{q.selected_movie.overview}</p>}
                    <form className="form-group" onSubmit={this.handleSubmit}>
                        <h3 className="text-center">{q.text}</h3>
                        <div className="options-cont">
                            {options}
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
Question.propTypes = {
    question: React.PropTypes.object,
    updateQuestionsAnswered: React.PropTypes.func,
    difficulty: React.PropTypes.string
}
class QuestionGallery extends React.Component {
    constructor(){
        super()
        autoBind(this)
    }
    render(){
        let posters = this.props.questions.map((q,key)=>{
            return <Poster movie={q.selected_movie} correct={q.correct} answer={q.answer} key={key}/>
        })
        return(
            <div className="col-md-12 col-sm-12" style={{marginBottom:'90px'}}>
                {posters}
            </div>
        )
    }
}
function mapStateToProps(state){
    return {
        questions: state.questions,
        game: state.game
    }
}
function mapDispatchToProps(dispatch){
    return {
        createQuestion: (question) => dispatch({type: "CREATE_QUESTION",payload:question}),
        updateQuestion: (question) => dispatch({type: "UPDATE_QUESTION",payload:question}),
        clearQuestions: () => dispatch({type: "CLEAR_QUESTIONS",payload:{}})
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Questions);