import { createDrawerNavigator } from 'react-navigation'

import { HomeScreen } from '../screens'
import SetOfTabs from './TabsNav'

export default createDrawerNavigator({
  Home: HomeScreen,
  Tabs: SetOfTabs,
})
