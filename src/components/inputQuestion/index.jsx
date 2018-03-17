import React, { Component } from 'react';

function onInputChange(evt, onChange) {
  onChange(evt.target.value)
}

const Input = ({ answer, onChange }) => (
  <div>
    <input
      type="text"
      value={answer}
      onChange={evt => onInputChange(evt, onChange)}  
    />
  </div>
)

export default Input