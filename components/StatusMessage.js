import React from 'react'
import styled from 'styled-components'
import { Text, Image } from 'react-native'
import Jumbotron from './Jumbotron'

const MessageText = styled.Text`
  text-align: center;
  font-family: ${props => props.theme.font.reg};
  font-size: ${props => props.theme.sizing.lg};
  color: ${props => props.theme.black.focused};
`

const STATUS_TYPE = {
  error: require('../assets/icons/Error.png'),
  loading: require('../assets/icons/Download.png'),
  empty: require('../assets/icons/Empty.png'),
}

export default ({ message, status }) => (
  <Jumbotron>
    {!!status && <Image source={STATUS_TYPE[status]} style={{ height: 200, width: 200 }} />}
    <MessageText>{message}</MessageText>
  </Jumbotron>
)
