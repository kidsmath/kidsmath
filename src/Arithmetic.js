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

  let initLevel = localStorage.getItem('level');
  if (!initLevel) {
    initLevel = 1;
  }

  // Declare a new state variable
  const [level, setLevel] = useState(initLevel);
  // const correctCount = useMemo(() => factorialOf(number), [number]);

  let onAnswerCorrect = function(questions, correctCount) {
    setCorrectCount(correctCount);
    console.log(`Arithmetic::onAnswerCorrect ${correctCount}`);
    if (questions.length == correctCount) {
      // console.log(`All correct! initLevel=${initLevel}`);
      const nextLevel = parseInt(initLevel) + 1;
      localStorage.setItem('level', nextLevel);
      setLevel(nextLevel);
      // TODO: congrats animation
    }
  };

  const query = useQuery();

  let ops = JSON.parse(query.get('ops'));
  if (!ops) {
    ops = ['+', '-'];
  }

  let initQuestions = [];
  let generator = new QuestionGenerator();
  const questionsCount = 20;
  const min = parseInt(query.get('min')? query.get('min') : '1') ;
  const max = parseInt(query.get('max')? query.get('max') : '20') ;
  for (let i = 0; i < questionsCount; i++) {
    initQuestions = initQuestions.concat(generator.generate(1, ops, min, max));
    // questions = questions.concat(generator.generate(1, ['*', '/'], 2, 9));
  }
  const [questions] = useState(initQuestions);
  const [correctCount, setCorrectCount] = useState(0);

  // const questions = new QuestionGenerator().generate(20, ['+', '-'], 5, 30);
  return (<div className = "App">
    <div className="App-header">
      {/* <h2>Kids Math</h2> */}
      <h2>Level: <span className="level">{level}</span></h2>
      <div>{correctCount} / {questions.length}</div>
    </div>
    <div className="questions">
      <form ><QuestionList questions = { questions } onAnswerCorrect={ onAnswerCorrect.bind(this) } /></form >
    </div>
  </div>);
}

export default Arithmetic;
