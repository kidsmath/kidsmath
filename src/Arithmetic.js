import React from 'react';
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

  let questions = [];
  let generator = new QuestionGenerator();
  for (let i = 0; i < 15; i++) {
    questions = questions.concat(generator.generate(1, ops, 10, 20));
    // questions = questions.concat(generator.generate(1, ['*', '/'], 2, 9));
  }
  // const questions = new QuestionGenerator().generate(20, ['+', '-'], 5, 30);
  return ( < div className = "App" > {
      /* <div className="App-header">
                          <img src={logo} className="App-logo" alt="logo"/>

                          <h2>Kids Math</h2>

                      </div>
                      <div> */
    } < form > < QuestionList questions = { questions } /></form > { /* </div> */ }
    </div>
  );
}

export default Arithmetic;
