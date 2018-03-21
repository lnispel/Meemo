/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  AsyncStorage,
  Image
} from 'react-native';
import styled from 'styled-components'
import Configuration from './components/Configuration';
import AddBtnHolder from './components/AddBtnHolder';

export default class App extends Component<{}> {
  constructor(props) {
    super(props)
    this.state = {
      configurations: [],
      locations: [
        {
          title: "Kitchen",
          beaconId: 1
        },
        {
          title: "Marcus's Room",
          beaconId: 2
        },
        {
          title: "Luke's Room",
          beaconId: 3
        },
      ],

      commands: [
        {
          id: 1,
          name: 'Lights On',
          description: 'Turns on all lights in a room',
          settings: {}
        },
        {
          id: 2,
          name: 'Lights Off',
          description: 'Turns off all lights in a room',
          settings: {}
        }
      ],

      conditions: [
        {
          id: 1,
          name: 'Present',
          description: 'When beacon and phone connect'
        },
        {
          id: 2,
          name: 'Not Present',
          description: 'When beacon and phone disconnect'
        }
      ]
    },
    this.loadConfigurations = this.loadConfigurations.bind(this)
    this.configUpdate = this.configUpdate.bind(this)
    this.deleteConfig = this.deleteConfig.bind(this)
    this.addConfig = this.addConfig.bind(this)
    this.setConfigs = this.setConfigs.bind(this)
  }

  componentDidMount() {
    AsyncStorage.getItem("configurations")
      .then(value => {
          this.setState({ configurations: JSON.parse(value) });
      })
      .done();
  }

  loadConfigurations() {
    if(this.state.configurations != null) {
      return this.state.configurations.map((config, index) => (
        <Configuration
          key={index}
          id={config.id}
          commandId={config.commandId}
          locationId={config.locationId}
          conditionId={config.conditionId}
          commands={this.state.commands}
          locations={this.state.locations}
          conditions={this.state.conditions}
          onUpdate={(key, value) => this.configUpdate(index, key, value)}
          onDelete={(key, value) => this.deleteConfig(index)}>
        </Configuration>
      ))
    } else {
      var array = [];
      this.setState({configurations: array})
    }
  }

  configUpdate(index, key, value) {
    var configs = this.state.configurations;
    var config = configs[index];
    config[key] = value;

    this.setState({ configurations: configs });

    this.setConfigs(configs)
  }

  deleteConfig(index){
    var configs = this.state.configurations.splice(index, 1);

    this.setState({ configurations: configs });

    this.setConfigs(configs)
  }

  addConfig(){
    var config = {
      id: Math.random(),
      commandId: 1,
      locationId: 1,
      conditionId: 1
    }

    var configs = this.state.configurations;
    configs.push(config);

    this.setState({ configurations: configs });

    this.setConfigs(configs);
  }

  setConfigs(configs) {
    const stringifiedArray = JSON.stringify(configs)
    AsyncStorage.setItem("configurations", stringifiedArray);
  }

  render() {
    return (
      <MainView contentContainerStyle={{'alignItems': 'center'}}>
        <HomeLabel>
          {this.props.AtHome}
        </HomeLabel>
        <RoomLabel>
          {this.props.InRoom}
        </RoomLabel>
        <Meemo
         source={require('./components/media/images/meemo.png')}
       />
        {this.loadConfigurations() }
        <ConfigLabel>
         Add Configuration
        </ConfigLabel>
        <AddBtnHolder
          onPress={this.addConfig}/>
      </MainView>
    );
  }
}


const MainView = styled.ScrollView `
  flex: 1;
  backgroundColor: #e7f2f7;
`;

const Meemo = styled.Image `
  max-width: 73px;
  max-height: 62.25px;
  margin-left: auto;
  margin-right: auto;
`;

const ConfigLabel = styled.Text`
  height: 40px;
  text-align: center;
  margin: 20px;
  margin-bottom: -50px;
  font-size: 14px;
  font-weight: bold;
`;

const RoomLabel = styled.Text`
  margin-top: -25px;
  font-weight: bold;
  font-size: 18px;
  color: #1592e6;
  padding: 10px;
  text-align: center;
  display: flex;
  align-self: center;
`;

const HomeLabel = styled.Text`
  margin-top: 10px;
  font-weight: bold;
  font-size: 28px;
  color: #1592e6;
  padding: 10px;
  text-align: center;
  display: flex;
  align-self: center;
`;
