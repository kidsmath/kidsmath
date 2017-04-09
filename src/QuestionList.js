import React from 'react';
import Question from './Question';

export default class QuestionList extends React.Component {
    render() {
        const questionList = this.props.questions.map((question, index) => {
            return <Question {...question} key={index}/>;
        });
        return <div>{questionList}</div>;
    }
}
