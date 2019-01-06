import { createDrawerNavigator } from 'react-navigation'

import { HomeScreen, OtherScreen } from '../screens'

import SetOfTabs from './TabsNav'

export default createDrawerNavigator({
  Home: HomeScreen,
  Other: OtherScreen,
  Tabs: SetOfTabs,
})
