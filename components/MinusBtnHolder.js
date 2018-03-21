import React, { Component } from 'react';
import {
  Image,
  TouchableHighlight
} from 'react-native';
import styled from 'styled-components'

export default class MinusBtnHolder extends Component<{}> {

  render() {
    return (
      <Wrapper onPress={this.props.onPress}>
         <MinusBtn
           source={require('./media/images/minus.png')}
         />
      </Wrapper>
    );
  }
}

const MinusBtn = styled.Image `
  bottom: 0;
  width: 30px;
  height: 30px;
`;

const Wrapper = styled.TouchableHighlight `
  width: 30px;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 30px;
`;
