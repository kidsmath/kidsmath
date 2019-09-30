import React from 'react';
import './Question.css';


export default class Question extends React.Component {
  constructor() {
    super();
    //this.correctSign = '★';
    this.correctSign = '⭐';
    this.wrongSign = '😢';
    this.state = {
      sign: ''
    };

    this.handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        // console.log('Enter');
        event.preventDefault();

        if (event.target.value) {

          if (event.target.value === this.props.result.toString()) {
            this.setState({
              sign: this.state.sign + this.correctSign
            });

            this.focusToNextInput(event);

          } else {
            this.setState({
              sign: this.state.sign + this.wrongSign
            });
          }
        } else {
          // empty, clear sign
          this.setState({
            sign: null
          });
        }
      } else {
        console.log('Enter: ' + event.target.value);
      }
    };
  }

  focusToNextInput(event) {
    // move focus to next input
    const form = event.target.form;
    const index = Array.prototype.indexOf.call(form, event.target);
    const element = form.elements[index + 1];
    if (element) {
      element.focus();
    } else {
      // otherwise mean already reach the last element.
    }
  }

  render() {
    return (
      <p className = "question" >
        <span className = "lhs" > { this.props.lhs } </span>
        <span>{this.props.op}</span >
        <span className = "rhs" > { this.props.rhs } </span>
        =
        <input type = "number" onKeyPress = { this.handleKeyPress } />
        <span > { this.state.sign } </span>
      </p>
    );
  }
}
