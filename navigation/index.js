import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation'

import { AuthLoadingScreen, SignInScreen } from '../screens'
import BaseStack from './BaseStack'

const AuthStack = createStackNavigator(
  {
    SignIn: SignInScreen,
  },
  {
    headerMode: 'none',
  }
)

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: BaseStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
)
