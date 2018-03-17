import React, { Component } from 'react';
import { map, mapValues } from 'lodash';
import yaml from 'js-yaml';

import Opeteh from '../../vendor/opeteh.es.js';
import Answers from '../../components/answers/index.jsx';

class Server extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: null,
      clients: {},
      file: null,
      started: false,
      survey: null,
      answers: {},
    };


    console.log(Opeteh);
    this.server = new Opeteh.OpetehServer(props.signallingServer, props.iceServers, 8);
    this.server.listen();
    this.server.initialization()
      .then(async (room) => {
        this.setState({
          ...this.state,
          room: room,
        });
      });

    this.handleIncomingClient = this.handleIncomingClient.bind(this);
    this.fileInputChange = this.fileInputChange.bind(this);
    this.onStart = this.onStart.bind(this);


    this.handleIncomingClient();
  }

  get clientNames() {
    return mapValues(this.state.clients, (client, clientId) => {
      if (client.info) {
        return client.info.name
      } else {
        return 'unnamed';
      }
    })
  }


  async handleIncomingClient() {
    while (true) {
      let clientId = await this.server.newClient();
      await this.server.clientInfo();
      if (this.state.started) {
        this.server.send({
          survey: this.state.survey,
        }, clientId, 'GENERAL_INFO')
      }
      this.setState({
        clients: this.server.clientsInfo,
        answers: {
          ...this.state.answers,
          [clientId]: [],
        }
      })
    }

  }

  showClients() {
    return map(this.state.clients, (client) => {
      return (
        <div>
          {client.info.name}
        </div>
      )
    })
  }

  fileInputChange(evt) {
    let file = evt.target.files[0]
    let reader = new FileReader()
    reader.onload = (event) => {
      let config = yaml.load(event.target.result);
      this.setState({
        ...this.state,
        survey: config.survey,
      })

    }
    reader.readAsText(file)
  }

  async onStart() {
    this.setState({
      ...this.state,
      started: true,
    })
    this.server.send({
      survey: this.state.survey,
    }, 'BROADCAST', 'GENERAL_INFO')
    let message;
    while (true) {
      message = await this.server.receive(undefined, 'SURVEY_ANSWER')
      console.log(message)
      this.setState({
        ...this.state,
        answers: {
          ...this.state.answers,
          [message.from]: message.data.answers,
        }
      })
    }
  }

  render() {
    window.clients = this.state.clients
    return (
      <div className="Server">
        <h1>Server</h1>
        {!this.state.started ?
          <div>
            <div>{this.state.room}</div>
            {!this.state.survey ?
              <div>
                <span>Choose survey configuration</span >
                <br />
                <input
                  type="file"
                  name="configuration"
                  accept=".yml,.yaml"
                  onChange={this.fileInputChange}
                />
              </div>
              : null}
            <div>
              <h2>
                Connected clients
            </h2>
              <div>
                {this.showClients()}
              </div>
              {this.state.survey && Object.keys(this.state.clients).length > 0 ?
                <div>
                  <button onClick={this.onStart}>
                    Start the survey
            </button>
                </div>
                : null}
            </div>
          </div>
          : 
          <div>
            started collecting data
            <Answers answers={this.state.answers} survey={this.state.survey} clientNames={this.clientNames} />
          </div>
          }
          
      </div>
    );
  }
}

export default Server;
