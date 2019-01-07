import React from 'react'
import { Text, TouchableOpacity, Image, View } from 'react-native'
import styled from 'styled-components/native'

const AvatarContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 16px 0;
`

const AvatarImage = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 24px;
`

const AvatarName = styled.Text`
  color: ${props => props.theme.primary};
  font-size: ${props => props.theme.sizing.lg}px;
  font-family: ${props => props.theme.font.bold};
`

export default ({ id, firstName, lastName, avatar, extraInfo }) => (
  <AvatarContainer>
    <AvatarImage source={{ uri: avatar }} />
    <View style={{ marginLeft: 16 }}>
      <AvatarName>
        {firstName.charAt(0)}. {lastName}
      </AvatarName>
      {!!extraInfo && <Text style={{ color: '#A4A5AA' }}>{extraInfo}</Text>}
    </View>
  </AvatarContainer>
)
