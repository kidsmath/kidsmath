import React from 'react';
import './Question.css';

export default class Question extends React.Component {
  constructor() {
    super();
    //this.correctSign = '★';
    this.correctSign = '⭐';
    this.wrongSign = '😢';
    this.previousAnswer = null;
    this.state = {
      sign: ''
    };

    // The events onKeyUp or onKeyPress won't be called when 'Tab' is pressed
    // because it triggers a onBlur before, you need to catch it with onKeyDown.
    this.handleKeyDown = (event) => {
      if (event.key === 'Tab') {
        if (event.target.value) {
          if (event.target.value == this.previousAnswer) {
            event.preventDefault();
            return;
          }
          if (event.target.value === this.props.result.toString()) {
            this.setState({
              sign: this.state.sign + this.correctSign
            });
          } else {
            this.setState({
              sign: this.state.sign + this.wrongSign
            });
            event.preventDefault();
          }
          this.previousAnswer = event.target.value;
        } else {
          // empty, clear sign
          this.setState({
            sign: ''
          });
        }
      }
    };

    this.handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        // console.log('Enter');
        event.preventDefault();

        if (event.target.value) {
          if (event.target.value == this.previousAnswer) {
            event.preventDefault();
            return;
          }
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
          this.previousAnswer = event.target.value;
        } else {
          // empty, clear sign
          this.setState({
            sign: ''
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
        <input type = "number" pattern="[0-9]*" inputMode="numeric" onKeyDown={ this.handleKeyDown } onKeyPress={ this.handleKeyPress } />
        <span > { this.state.sign } </span>
      </p>
    );
  }
}
