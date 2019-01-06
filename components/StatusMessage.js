import styled from 'styled-components'
import { Text } from 'react-native'

export default styled.Text`
  text-align: center;
  font-family: ${props => props.theme.font.reg};
  font-size: ${props => props.theme.sizing.lg};
  color: ${props => props.theme.black.focused};
`
