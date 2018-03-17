import React, { Component } from 'react';
import { map } from 'lodash';

function onInputChange(evt, index, answer, onChange) {
  let newAnswers = [...answer];
  newAnswers[index] = evt.target.checked;
  onChange(newAnswers);
}

function getOptions(options, questionIndex, answer, onChange) {
  return map(options, (option, index) => {
    return (
      <div>
        <input
          type="checkbox"
          value={index}
          id={`checkbox-${questionIndex}-${index}`}
          name={`${index}-question`}
          checked={answer[index]}
          onChange={evt => {onInputChange(evt, index, answer, onChange)}}
        />
        <label htmlFor={`checkbox-${questionIndex}-${index}`}>{option}</label>
      </div>
    )
  })
}

const Checkbox = ({ index, options, answer, initialize, onChange }) => (
  <div>
    {getOptions(options, index, answer, onChange)}
  </div>
)

export default Checkbox;

export const initialize = () => {
  return []
}