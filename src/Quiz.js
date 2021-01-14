//Contains all the logic for the quiz
//This is a class component. In react, there are 2 kinds- Class component, Functional component

import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {Link} from "react-router-dom"
import {QuizData} from './QuizData'
import './styles.css'
import Select, { components } from 'react-select';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import MultiSelect from "@khanacademy/react-multi-select";



export class Quiz extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             userAnswer: null,
             currentIndex: 0,
             options:[],
             quizEnd: false,
             score:0,
             disabled: true,
             showCorrect:[],
             askedQuestion:[],
             
        }
    }
    
    //Component that holds the current quiz
    loadQuiz = () => {
        //const shuffledPosts = shuffleArray(this.props.posts);

        const {currentIndex} = this.state //get the current index

        //https://stackoverflow.com/questions/37167264/javascript-output-random-object-from-array-of-objects
        var random_index = Math.floor(Math.random() * 50);
        //var obj = objects[random_index];

        this.setState(() => {
            return {
                question: QuizData[random_index].question,
                options : QuizData[random_index].options,
                answer: QuizData[random_index].answer,
                askedQuestion: this.state.askedQuestion.concat(QuizData[random_index].question + '\n'),
               
            }
        }
        )
    }

    //Handles Click event for the next button
    nextQuestionHander = () => {
        const {userAnswer, answer, score} = this.state
        //Check for correct answer and increment score
        if(userAnswer === answer){
            this.setState({
                score: score + 1,
                showCorrect: this.state.showCorrect.concat("  "+ answer + "  ")
            })
        }

        this.setState({
            currentIndex: this.state.currentIndex + 1,
            userAnswer: null
        })  
    }

    //Load the quiz once the component mounts
    componentDidMount(){
        this.loadQuiz();
    }

    //Update the component
    componentDidUpdate(prevProps, prevState){
        const{currentIndex} = this.state;
        var random_index = Math.floor(Math.random() * 50);
        if(this.state.currentIndex !== prevState.currentIndex){
            this.setState(() => {
                return {
                    disabled: true,
                    askedQuestion: this.state.askedQuestion.concat(QuizData[random_index].question + '\n'),
                    question: QuizData[random_index].question,
                    options : QuizData[random_index].options,
                    answer: QuizData[random_index].answer,
                            
                }
            });

        }
    }




    //Check the answer
    checkAnswer = answer => {
        this.setState({
            userAnswer: answer,
            disabled:false
        })
    }


    //Responds to the click of the finish button
    finishHandler =() => {
        if(this.state.currentIndex === 4){
            this.setState({
                quizEnd:true
            })
        }

    }

    

    render() {
        const {question, options, currentIndex, userAnswer, quizEnd} = this.state //get the current state       
        if(quizEnd) {
            return (
                <div class = "finalpanel">
                    <h1> Final Score is {this.state.score} out of 5!</h1>
                    
                    <h4> Questions Asked: {this.state.askedQuestion}</h4>
                    <h4> Your correct answers: {this.state.showCorrect}</h4>
                    {/* <button className="playBtn" onClick={() => this.playAgain} > Play Again! </button> */}
                    <Link to="/"><button className = "invButton">
                            Play Again 
                                </button></Link>
 
                </div>
            )
        }
               
        return (
            <div class = "questionpanel">
               <h2>{question}</h2>
                <span>{`Question ${currentIndex+1} of 5`}</span>
                {options.map(option => (  //for each option, new paragraph
                    <p key={option.id} 
                    className={`options ${userAnswer === option ? "selected" : null}`}
                    onClick= {() => this.checkAnswer(option)}>
                        {option}
                    </p>
                ))}
                {currentIndex < 4 &&  
                // Next button only displays if the above is true
                <button
                    className="invButton" 
                    disabled = {this.state.disabled}
                    onClick = {this.nextQuestionHander}
                 >Next Question</button>
                }
                 {currentIndex === 4 &&
                    <button
                    className="invButton"
                    disabled = {this.state.disabled}
                    onClick = {this.finishHandler}
                    >Finish</button>
                 }
            </div>
        )
    }
}

export default Quiz
