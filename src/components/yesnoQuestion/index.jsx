import React, { Component } from 'react';

function onInputChange(value, onChange) {
  onChange(value)
}

const YesNo = ({index, answer, onChange}) => (
  <div>
    <div>
      <input
        type="radio"
        value="yes"
        id={`yesno-${index}-yes`}
        name={`question-${index}`}
        checked={answer === true}
        onChange={evt => onInputChange(true, onChange)}
      />
      <label htmlFor={`yesno-${index}-yes`}>Yes</label>
    </div>
    <div>
      <input
        type="radio"
        value="no"
        id={`yesno-${index}-no`}
        name={`question-${index}`}
        checked={answer === false}
        onChange={evt => onInputChange(false, onChange)}
      />
      <label htmlFor={`yesno-${index}-no`}>No</label>
    </div>
  </div>
)

export default YesNo;