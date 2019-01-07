import { Text, View } from 'react-native'
import styled from 'styled-components/native'

export default styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-around;
  background-color: ${props =>
    props.mode ? props.theme[props.mode] : props.theme.white};
`

export const JumboTitle = styled.Text`
  font-family: os-bold;
  font-size: ${props => props.theme.sizing.gi};
  color: ${props =>
    props.mode ? props.theme[props.mode] : props.theme.primary};
`
