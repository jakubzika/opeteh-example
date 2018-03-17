import React, { Component } from 'react';
import { map } from 'lodash';

import Checkbox from '../checkboxQuestion/index.jsx';
import Input from '../inputQuestion/index.jsx';
import Number from '../numberQuestion/index.jsx';
import YesNo from '../yesnoQuestion/index.jsx';


class Survey extends Component {
  constructor(props) {
    super(props)
    this.state = {
      answers: this.getEmptyAnswers(),
    }

    this.onChange = this.onChange.bind(this);
  }

  onChange(index) {
    return (answer) => {
      let newAnswers = [...this.state.answers]
      newAnswers[index] = answer
      this.setState({
        ...this.state,
        answers: newAnswers,
      })
      this.props.answersChanged(newAnswers);
    }
  }

  getEmptyAnswers() {
    return map(this.props.survey, (question) => {
      switch (question.type) {
        case 'yes-no':
          return null;
        case 'checkbox':
          return map(question.options, () => true);
        case 'number':
          return question.min;
        case 'input':
          return '';
      }
    })
  }

  questions() {
    return map(this.props.survey, (question, index) => {
      const base = {
        answer: this.state.answers[index],
        onChange: this.onChange(index),
        index: index,
      }
      switch (question.type) {
        case 'yes-no':
          return (
            <YesNo
              {...base}

            />
          );
        case 'checkbox':
          return (
            <Checkbox
              {...base}
              options={question.options}
            />
          );
        case 'number':
          return (
            <Number
              {...base}
              min={question.min}
              max={question.max}
            />
          );
        case 'input':
          return (
            <Input
              {...base}
            />
          );
      }
    })
  }

  formComponents() {
    return map(this.questions(), (question, index) => {
      return (
        <div>
          <div>{index + 1}. {this.props.survey[index].title}</div>
          {question}
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={(evt) => { evt.preventDefault() }}>
          {this.formComponents()}
        </form>
      </div>
    )
  }
}

export default Survey