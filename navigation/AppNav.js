import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation'

import { AuthLoadingScreen, SignInScreen } from '../screens'
import MenuDrawer from './MenuDrawer'

const AppStack = createStackNavigator(
  {
    Base: MenuDrawer,
  },
  {
    defaultNavigationOptions: ({ navigation, screenProps }) => ({
      headerBackTitle: 'none',
      headerStyle: {
        backgroundColor: screenProps.theme.primary,
      },
      headerTintColor: screenProps.theme.white,
      headerTitleStyle: {
        fontFamily: screenProps.theme.font.bold,
      },
      title: 'YABA Social',
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Ionicons
            name="md-menu"
            size={28}
            color={'white'}
            style={{ paddingLeft: 12, paddingRight: 24 }}
          />
        </TouchableOpacity>
      ),
    }),
  }
)

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
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
)
