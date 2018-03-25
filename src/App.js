import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Server from './containers/server/Server.jsx';
import Client from './containers/client/Client.jsx';
import Survey from './components/survey/index.jsx';
import yaml from 'js-yaml';

const signallingServer = 'ws://localhost:8002/';
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
      <div className="App centered">
        <h1>Opeteh library example</h1>
        {!this.state.type ?
          <div>
            <div>
              <div>If you want to host survey choose server. If you want to connect to existing survey choose client</div>
              <button className={"btn btn-primary"} onClick={this.isServer}>Server</button>
              <button className={"btn btn-primary"} onClick={this.isClient}>Client</button>
            </div>
            <div>
              <div>
                server must have survey config file, if you dont have one but still want to test it download 
                <a href="/survey-01.yml" download={"survey.yml"}> this file</a>
              </div>
              <div>
                if you want to create your own survey you can find info how to do so <a href="https://github.com/jakubzika/opeteh-example/blob/master/README.md">here</a>
              </div>
            </div>
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
