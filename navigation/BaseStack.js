import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { createStackNavigator } from 'react-navigation'

import { PostScreen } from '../screens'
import MenuDrawer from './MenuDrawer'

export default createStackNavigator(
  {
    Base: {
      screen: MenuDrawer,
      navigationOptions: ({ navigation, screenProps }) => ({
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Ionicons
              name="md-menu"
              size={28}
              color={screenProps.theme.white}
              style={{ paddingLeft: 12, paddingRight: 24 }}
            />
          </TouchableOpacity>
        ),
      }),
    },
    Post: PostScreen,
  },
  {
    defaultNavigationOptions: ({ navigation, screenProps }) => ({
      headerBackTitle: null,
      headerStyle: {
        backgroundColor: screenProps.theme.primary,
      },
      headerTintColor: screenProps.theme.white,
      headerTitleStyle: {
        fontFamily: screenProps.theme.font.bold,
      },
      title: 'YABA Social',
    }),
    cardStyle: {
      backgroundColor: '#ebeee7',
    },
  }
)
