import React from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'

export default styled.TouchableOpacity`
  padding: 16px;
  border: 0.5px solid ${props => props.theme.accent};
  border-radius: 4px;
  background-color: white;
`
