import React from 'react';
import QuestionList from './QuestionList';
import QuestionGenerator from './QuestionGenerator';
import './App.css';
import logo from './logo.svg';

class Arithmetic extends React.Component {
    render() {
        const questions = new QuestionGenerator().generate(20);
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>

                    <h2>Kids Math</h2>

                </div>
                <div>
                    <form><QuestionList questions={questions}/></form>
                </div>
            </div>
        );
    }
}

export default Arithmetic;
