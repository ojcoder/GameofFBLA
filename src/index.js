import ReactDOM from 'react-dom'  //import the library that lets us render content in the HTML DOM (index.html)
import React from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Quiz from './Quiz'
import Home from './Home'
import './styles.css'

    const rootElement = document.getElementById("root");
    ReactDOM.render(
      <BrowserRouter>
       <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/quiz" component={Quiz} />
      </Switch>
      </BrowserRouter>,
      rootElement
    );



