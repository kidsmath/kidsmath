import React, { useState, useMemo } from 'react';
import QuestionList from './QuestionList';
import QuestionGenerator from './QuestionGenerator';
import './App.css';
//import logo from './logo.svg';
import {
  useLocation
} from "react-router-dom";

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Arithmetic() {
  const query = useQuery();
  let ops = JSON.parse(query.get('ops'));
  if (!ops) {
    ops = ['+', '-'];
  }
  let category = JSON.parse(query.get('category'));
  const storageKey = `${category}_level`

  let initLevel = parseInt(localStorage.getItem(storageKey));
  if (!initLevel) {
    initLevel = 1;
  }


  function initQuestions(level) {
    let questions = [];
    let generator = new QuestionGenerator();
    const questionsCount = 2 + (level-1)*2;
    const min = parseInt(query.get('min')? query.get('min') : '1') ;
    const max = parseInt(query.get('max')? query.get('max') : '20') ;
    for (let i = 0; i < questionsCount; i++) {
      questions = questions.concat(generator.generate(1, ops, min, max));
      // questions = questions.concat(generator.generate(1, ['*', '/'], 2, 9));
    }
    return questions;
  }

  // Declare a new state variable
  const [level, setLevel] = useState(initLevel);
  const [questions, setQuestions] = useState(initQuestions(level));
  const [correctCount, setCorrectCount] = useState(0);
  const [showCongrats, setShowCongrats] = useState(false);

  let onAnswerCorrect = function(correctCount) {
    setCorrectCount(correctCount);
    console.log(`Arithmetic::onAnswerCorrect ${correctCount}, question length ${questions.length}`);
    if (questions.length == correctCount) {
      setShowCongrats(true);
    }
  };

  let onNextLevel = function() {
    localStorage.setItem(storageKey, level+1);
    window.location.reload();
  }

  // const questions = new QuestionGenerator().generate(20, ['+', '-'], 5, 30);
  return (<div className = "App">
    <div className="App-header">
      {/* <h2>Kids Math</h2> */}
      <h2>Level: <span className="level">{level}</span></h2>
      <div>{correctCount} / {questions.length}</div>
    </div>
    <div className="questions">
      <form ><QuestionList questions = { questions } onAnswerCorrect={ onAnswerCorrect } /></form >
    </div>
    { showCongrats && 
        <div className="center">
          <button className="btn next-level" onClick={onNextLevel}>Next level</button>
          <img src="congrats-43.gif" height="300px"/>
        </div>
    }
  </div>);
}

export default Arithmetic;
