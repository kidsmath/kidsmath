import React from 'react';
import Question from './Question';

export default class QuestionList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      correctCount: 0
    };

    this.onAnswerCorrect = this.onAnswerCorrect.bind(this);
  }

  onAnswerCorrect(question) {
    // console.log(`onAnswerCorrect(${question}) 1 ${this.state.correctCount}`);
    this.props.onAnswerCorrect(this.props.questions, this.state.correctCount + 1);
    this.setState({
      correctCount: this.state.correctCount + 1
    });
  }

  render() {
    const questionList = this.props.questions.map((question, index) => {
      return <Question {...question} key={index} onAnswerCorrect={this.onAnswerCorrect.bind(this)} />;
    });

    return <div > {questionList} < /div>;
  }
}
