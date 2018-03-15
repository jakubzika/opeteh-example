import React, { Component } from 'react';
import { map, filter } from 'lodash';

const Answers = ({ answers, survey, clientNames }) => {

  let data = map(survey, (question, index) => {
    return (
      <div>
        <div>{question.title}</div>
        <ul>
          {map(answers, (answer, clientId) => {
            let text = '';
            if (answer.length !== 0) {
              switch (question.type) {
                case 'yes-no':
                  text = answer[index] === true ? 'yes' : answer[index] === false ? 'no' : '-';
                  break;
                case 'checkbox':
                  text = filter({...question.options}, (answerValue, answerIndex) => { return answer[index][answerIndex] }).join(',')
                  break;
                case 'number':
                  text = String(answer[index]);
                  break;
                case 'input':
                  text = answer[index];
                  break;
              }
            }
            return (
              <li>
                <span>{clientNames[clientId]}</span>:<span>{text}</span>
              </li>
            );
          })}
        </ul>
      </div>
    )
  })

  return (
    <div>
      {data}
    </div>
  )
}

export default Answers;
