import React, { Component } from 'react';
import {
  Text,
  Picker,
  View,
  Image
} from 'react-native';
import MinusBtnHolder from './MinusBtnHolder';
import styled from 'styled-components'

export default class Configuration extends Component<{}> {
  constructor(props) {
    super(props)

    this.loadCommands = this.loadCommands.bind(this)
    this.loadLocations = this.loadLocations.bind(this)
    this.loadConditions = this.loadConditions.bind(this)
  }

  loadCommands() {
    return this.props.commands.map((command, i) => (
      <Picker.Item key={2} label={command.name} value={command.id} />
    ))
  }
  loadLocations () {
    return this.props.locations.map((location, i) => (
      <Picker.Item key={3} label={location.title} value={location.beaconId} />

    ))
  }
  loadConditions() {
    return this.props.conditions.map((condition, i) => (
      <Picker.Item key={4} label={condition.name} value={condition.id} />
    ))
  }

  render() {
    return (
      <ConfigHolder >
        <ValueRanges
          itemStyle={{height: 80}}
          selectedValue={this.props.commandId}
          onValueChange={(itemValue, itemIndex) => this.props.onUpdate('commandId', itemValue)}>
          { this.loadCommands() }
        </ValueRanges>

        <Label>
          In
        </Label>

        <ValueRanges
          itemStyle={{height: 80}}
          selectedValue={this.props.locationId}
          onValueChange={(itemValue, itemIndex) => this.props.onUpdate('locationId', itemValue)}>
          { this.loadLocations()  }
        </ValueRanges>

        <Label>
          When
        </Label>

        <ValueRanges
          itemStyle={{height: 80}}
          selectedValue={this.props.conditionId}
          onValueChange={(itemValue, itemIndex) => this.props.onUpdate('conditionId', itemValue)}>
          { this.loadConditions() }
        </ValueRanges>

        <ConfigLabel>
          Remove Configuration
        </ConfigLabel>

        <MinusBtnHolder
          onPress={this.props.onDelete}/>
      </ConfigHolder>
    )
  }

}

const ValueRanges = styled.Picker `
  width: 250px;
  background-color: white;
  border-radius: 10px;
`;

const Label = styled.Text`
  height: 40px;
  text-align: center;
  margin: 10px;
  font-size: 20px;
  font-weight: bold;
`;

const ConfigHolder = styled.View`
  border: 2px solid #efefef;
  border-radius: 10px;
  width:300px;
  margin: 5px;
  margin-bottom: 20px;
  padding: 10px;
  padding-top: 25px;
  padding-bottom: 25px;
  align-items: center;
  background-color: #bedeed;
`;

const ConfigLabel = styled.Text`
  height: 40px;
  text-align: center;
  margin: 20px;
  margin-bottom: -50px;
  font-size: 14px;
  font-weight: bold;
`;
