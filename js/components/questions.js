import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import * as CONSTANTS from '../constants.js';
const { IMAGE_BASE_BACKDROP,IMAGE_BASE_POSTER } = CONSTANTS;

import {getMovie} from '../actions';

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
        if(this.state.movies.length>0){
            this.generateQuestion("title")
        }
    }
    componentWillReceiveProps(nextProps){
        if(!_.isEqual(this.props.movies,nextProps.movies)){
            if(nextProps.movies.length>0){
                this.setState({
                    original_movies: nextProps.movies,
                    movies: _.chunk(_.shuffle(nextProps.movies),4)
                },()=>{
                    this.generateQuestion("title")
                })
            }
        }
    }
    generateQuestion(type){
        let selected_chunk = this.state.movies[this.state.questions_answered],
            selected_movie = _.sample(selected_chunk),
            question = {};
        switch(type){
            case "title":{
                question = {
                    type: type,
                    text: "What is the name of this movie?",
                    correct: null,
                    assigned_player: this.props.activePlayer,
                    answer: selected_movie.original_title,
                    selected_movie: selected_movie,
                    answered: false,
                    choice_options: selected_chunk.map((m)=>{
                                return m.original_title
                            })
                }
                break;
            }
        }
        this.setState({
            questions_created: this.state.questions_created+1
        })
        this.props.createQuestion(question);
    }
    updateQuestionsAnswered(question){
        this.setState({
            questions_answered: this.state.questions_answered+1
        },()=>{
            this.props.updateQuestion(question)
            if(this.state.questions_created<this.props.qty){
                this.generateQuestion("title")
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
    render(){
        let unanswered_questions = this.props.questions.filter((q)=>{
            return !q.answered
        }),
        questions = unanswered_questions.map((q,key)=>{
            return <Question question={q} updateQuestionsAnswered={this.updateQuestionsAnswered} key={key}/>
        });
        
        return (
            <div>
                {(!this.state.questions_complete)?
                    questions
                :
                    <div>
                        <h1 className="text-center">You got {this.state.player_score} out {this.props.qty} correct</h1>
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
                return <button className="btn-lg btn-info option-btn text-center" style={{margin:'5px'}} onClick={(e)=>this.setState({answer: o})} key={o}>{o}</button>
            })
        return (
            <div>   
                <div className="col-md-10 center-block">
                    <img src={`${IMAGE_BASE_BACKDROP}${q.selected_movie.backdrop_path}`} style={{width:'65%',display:'block',margin:'0 auto'}}/><br/>
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
    updateQuestionsAnswered: React.PropTypes.func
}
function mapStateToProps(state){
    return {
        questions: state.questions
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