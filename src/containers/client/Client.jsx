import React, { Component } from 'react';

import Opeteh from '../../vendor/opeteh.es.js'
import Survey from '../../components/survey/index.jsx';

class Client extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: null,
      name: null,
      connected: false,
      survey: null,
      answers: null,
    },
    this.inputValueChange = this.inputValueChange.bind(this);
    this.connect = this.connect.bind(this);
    this.answersChanged = this.answersChanged.bind(this);

    this.client = new Opeteh.OpetehClient(props.signallingServer, props.iceServers);
  }

  inputValueChange(type, evt) {
    this.setState({
      ...this.state,
      [type]: evt.target.value
    })
  }

  async connect() {
    if (this.state.room && this.state.name) {
      this.client.connect(this.state.room, {
        name: this.state.name,
      })
    }
    await this.client.connection();
    this.setState({
      ...this.state,
      connected: true,
    })
    this.surveyProgress();
  }

  async surveyProgress() {
    let message = await this.client.receive('SERVER', 'GENERAL_INFO');
    this.setState({
      ...this.state,
      survey: message.data.survey,
    })
  }

  answersChanged(answers) {
    this.setState({
      ...this.state,
      answers,
    })
    this.client.send({answers}, 'SERVER', 'SURVEY_ANSWER')
  }

  render() {
    return (
      <div className="Client">
        <h1>Client</h1>
        {!this.state.connected ?
        <div>
          <div>
            <label>room</label>
            <input
            type="text"
            onChange={(evt) => {this.inputValueChange('room', evt)}}
            />
          </div>
          <div>
            <label>name</label>
            <input
            type="text"
            onChange={(evt) => {this.inputValueChange('name', evt)}}
            />
          </div>
          <button onClick={this.connect}>Connect!</button>
        </div> : null}
        {this.state.connected && this.state.survey ? <div>
          Connected
        </div>: null}
        {this.state.survey ?
        <div>
          <Survey survey={this.state.survey} answersChanged={this.answersChanged}/>
        </div>
        : null}
      </div>
    );
  }
}

export default Client;
