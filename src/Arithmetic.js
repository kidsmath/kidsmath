import React from 'react';
import QuestionList from './QuestionList';
import QuestionGenerator from './QuestionGenerator';
import './App.css';
//import logo from './logo.svg';

class Arithmetic extends React.Component {
  render() {
    // let questions = [];
    let questions = [];
    let generator = new QuestionGenerator();
    for (let i = 0; i < 15; i++) {
      questions = questions.concat(generator.generate(1, ['+', '-'], 10, 20));
      // questions = questions.concat(generator.generate(1, ['*', '/'], 2, 9));
    }
    // const questions = new QuestionGenerator().generate(20, ['+', '-'], 5, 30);
    return ( <div className = "App" > {
        /* <div className="App-header">
                            <img src={logo} className="App-logo" alt="logo"/>

                            <h2>Kids Math</h2>

                        </div>
                        <div> */
      } <form > < QuestionList questions = { questions } /></form > { /* </div> */ }
      </div>
    );
  }
}

export default Arithmetic;
