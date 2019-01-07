import { createMaterialTopTabNavigator } from 'react-navigation'

import { TabOneScreen, TabTwoScreen } from '../screens'

export default createMaterialTopTabNavigator(
  {
    TabOne: TabOneScreen,
    TabTwo: TabTwoScreen,
  },
  {
    backBehavior: 'none',
    defaultNavigationOptions: ({ screenProps }) => ({
      tabBarOptions: {
        activeTintColor: screenProps.theme.secondary,
        inactiveTintColor: screenProps.theme.primary,
        style: {
          backgroundColor: screenProps.theme.white,
        },
        labelStyle: {
          fontFamily: screenProps.theme.font.lite,
          fontSize: screenProps.theme.sizing.sm,
        },
        indicatorStyle: {
          backgroundColor: screenProps.theme.secondary,
        },
      },
    }),
  }
)
