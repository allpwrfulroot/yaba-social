import React from 'react'
import { Text, View } from 'react-native'
import styled from 'styled-components/native'
import { FontAwesome } from '@expo/vector-icons'

const TitleContainer = styled.View`
  margin: 16px 0;
  flex-direction: row;
`

const TitleText = styled.Text`
  color: ${props => props.theme.bright};
  font-size: 36px;
`

export default ({ title }) => (
  <TitleContainer>
    <TitleText>
      <FontAwesome name="quote-left" size={28} />
    </TitleText>
    <TitleText style={{ flex: 1 }}> {title} </TitleText>
  </TitleContainer>
)
