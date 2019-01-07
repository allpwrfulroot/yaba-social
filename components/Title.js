import React from 'react'
import { Text, View } from 'react-native'
import styled from 'styled-components/native'
import { FontAwesome } from '@expo/vector-icons'

import Quotes from '../assets/svg/Quotes'

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
    <Quotes color="#c0bc8d" />
    <TitleText style={{ flex: 1, textAlign: 'center' }}>{title}</TitleText>
    <View style={{ justifyContent: 'flex-end'}}>
      <Quotes color="#c0bc8d" inverted={true}/>
    </View>
  </TitleContainer>
)
