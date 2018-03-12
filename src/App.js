import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Server from './containers/server/Server.js';
import Client from './containers/client/Client.js';

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
      <div className="App">
        {!this.state.type ?
        <div>
          <span>Choose your side</span>
          <button onClick={this.isServer}>Server</button>  
          <button onClick={this.isClient}>Client</button>  
        </div> : null}
        {this.state.type === 'client' ? 
        <div>
          <Client />
        </div>: null}
        {this.state.type === 'server' ? 
        <div>
          <Server 
          signallingServer={signallingServer}
          iceServers={iceServers}
          />
        </div>: null}
      </div>
    );
  }
}

export default App;
