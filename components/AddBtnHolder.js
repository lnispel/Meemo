import React, { Component } from 'react';
import {
  Image,
  TouchableHighlight
} from 'react-native';
import styled from 'styled-components'

export default class AddBtnHolder extends Component<{}> {

  render() {
    return (
      <Wrapper onPress={this.props.onPress}>
         <AddBtn
           source={require('./media/images/plus.png')}
         />
      </Wrapper>
    );
  }
}

const AddBtn = styled.Image `
  bottom: 0;
  width: 30px;
  height: 30px;
`;

const Wrapper = styled.TouchableHighlight `
  margin-bottom: 30px;
  width: 30px;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 30px;
`;
