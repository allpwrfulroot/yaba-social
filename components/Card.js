import React from 'react'
import { Text, View } from 'react-native'
import styled from 'styled-components/native'
import { FontAwesome } from '@expo/vector-icons'

export default styled.TouchableOpacity`
  padding: 16px;
  border: 0.5px solid ${props => props.theme.accent};
  border-radius: 4px;
  background-color: white;
`
