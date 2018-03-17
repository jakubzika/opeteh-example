import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Server from './containers/server/Server.jsx';
import Client from './containers/client/Client.jsx';
import Survey from './components/survey/index.jsx';
import yaml from 'js-yaml';

const config = yaml.load(`
survey:
  - 
    type: yes-no
    title: Is this working ?
  -
    type: checkbox
    title: Which one of theese do you have home ?
    options:
      - anxiety
      - self hatred
      - father who beats you
  -
    type: number
    title: How many self inflicted scars do you have ?
    min: 4
    max: 20
  -
    type: input
    title: How do you call your gf during intercourse ?`)

const signallingServer = 'ws://192.168.1.10:8002/';
const iceServers = {
  iceServers: [
    {
      urls: 'stun:stun.l.google.com:19302',
    },
    {
      urls: 'stun:stun.services.mozilla.org'
    }
  ]
};

class App extends Component {
  constructor() {
    super();
    this.isServer = this.isServer.bind(this);
    this.isClient = this.isClient.bind(this);
    this.state = {
      type: null,
    }
  }
  isServer() {
    this.setState({
      ...this.state,
      type: 'server'
    })
  }

  isClient() {
    this.setState({
      ...this.state,
      type: 'client'
    })
  }

  render() {
    return (
      <div className="App">
        {!this.state.type ?
          <div>
            <span>Choose your side</span>
            <button onClick={this.isServer}>Server</button>
            <button onClick={this.isClient}>Client</button>
          </div> : null}
        {this.state.type === 'client' ?
          <div>
            <Client
              signallingServer={signallingServer}
              iceServers={iceServers}
            />
          </div> : null}
        {this.state.type === 'server' ?
          <div>
            <Server
              signallingServer={signallingServer}
              iceServers={iceServers}
            />
          </div> : null}
          {/* <Survey survey={config.survey}/> */}
      </div>
    );
  }
}

export default App;
