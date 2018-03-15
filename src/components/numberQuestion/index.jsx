import React, { Component } from 'react';

function onInputChange(evt, onChange) {
  onChange(evt.target.value)
}

const Number = ({index, max, min, answer, onChange}) => (
  <div>
    <input
      type="number"
      min={min}
      max={max}
      onChange={evt => onInputChange(evt, onChange)}
      value={answer}
    />
  </div>
)

export default Number;