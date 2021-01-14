import React, { Component } from 'react'
import {Link} from "react-router-dom"
import {QuizData} from './QuizData'
import styles from './styles.css'
import logo from './fblalogo100x100.png'; // with import


function Home() {

    return (
      <div className="homePage">
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        <img class ="logoimg" src={logo} />
        <p>
          Welcome to the Game of FBLA!
          <br />
          <br />
          This game will help you prepare for FBLA events by quizzing you on the history of FBLA.
        </p>
        <Link to="/quiz"><button className = "invButton">
          Start Quiz 
        </button>
        </Link>
      </div>
    );

}

export default Home;