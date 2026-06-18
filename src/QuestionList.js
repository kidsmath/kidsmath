import React from 'react';
import Question from './Question';

export default class QuestionList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      correctCount: new Array(props.questions.length)
    };

    this.onAnswerCorrect = this.onAnswerCorrect.bind(this);
  }

  onAnswerCorrect(questionKey) {
    let newCorrectCount;
    if (questionKey === 0) {
      newCorrectCount = [true, ...this.state.correctCount.slice(questionKey+1)];
    } else if (questionKey === this.props.questions.length - 1) {
      newCorrectCount = [...this.state.correctCount.slice(0, questionKey), true];
    } else {
      newCorrectCount = [...this.state.correctCount.slice(0, questionKey), true, ...this.state.correctCount.slice(questionKey+1)];
    }
    this.props.onAnswerCorrect(newCorrectCount.filter(q => q).length);
    this.setState({
      correctCount: newCorrectCount
    });
  }

  render() {
    const questionList = this.props.questions.map((question, index) => {
      return <Question {...question} key={index} index={index} onAnswerCorrect={this.onAnswerCorrect.bind(this)} />;
    });

    return <div> {questionList} </div>;
  }
}
