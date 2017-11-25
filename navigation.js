import React from 'react'
import {
  Platform,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  View,
  TouchableOpacity
} from 'react-native'
import {
  DrawerNavigator,
  StackNavigator,
  TabNavigator,
  TabBarTop,
  TabBarBottom,
  NavigationActions
} from 'react-navigation'
import {
  Ionicons
} from '@expo/vector-icons'
import BubbleText from './screens/components/BubbleText'
import Search from './screens/components/Search'

import Login from './screens/Login'
import SignupStart from './screens/SignupStart'
import SignupFinish from './screens/SignupFinish'
import ChatsPage from './screens/ChatsPage'
import Chat from './screens/Chat'
import Profile from './screens/Profile'
import EventsPage from './screens/EventsPage'
import EventDetails from './screens/EventDetails'
import EventMessages from './screens/EventMessages'
import EventOther from './screens/EventOther'
import EventsFilter from './screens/EventsFilter'
import CustomSearch from './screens/CustomSearch'
import FirstTab from './screens/FirstTab'
import SecondTab from './screens/SecondTab'
import ThirdTab from './screens/ThirdTab'
import MyProfile from './screens/MyProfile'
import TopFilter from './screens/TopFilter'
import Lightbox from './screens/Lightbox'

const defaultTabs = {
  labelStyle: {
    fontFamily: 'os-reg',
    fontSize: 16
  },
  indicatorStyle: {
    borderColor: 'lightgray',
    borderWidth: 2,
  },
  style: {
    backgroundColor: 'black'
  },
  tabStyle: {
    padding: 0,
  }
}

const defaultHeader = {
  headerStyle: {
    backgroundColor: 'black',
    shadowOpacity: 0,
    elevation: 0,
  },
  headerTitleStyle: {
    alignSelf: 'flex-start',
    fontFamily: 'os-reg',
    fontSize: 20,
    marginLeft: Platform.OS === 'ios' ? -10 : 10
  },
  headerTintColor: 'white',
  headerBackTitle: null
}

const EventsWithFilterStack = StackNavigator({
  EventsPage: {
    screen: EventsPage,
    navigationOptions: ({ navigation }) => ({
      headerRight: (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => navigation.navigate('TopFilter')} >
            <BubbleText text='Hi' color='yellow' />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('EventsFilter')} >
            <BubbleText text='Lo' color='green' />
          </TouchableOpacity>
        </View>
      )
    })
  },
  EventsFilter: {
    screen: EventsFilter,
    navigationOptions: ({ navigation }) => ({
      headerRight: (
        <TouchableOpacity onPress={() => navigation.goBack()} >
          <Ionicons name='md-close' size={28} color={'white'} style={{paddingRight: 12}}/>
        </TouchableOpacity>
      )
    })
  }
},{
  headerMode: 'none',
  mode: 'modal',
  initialRouteName: 'EventsPage',
  navigationOptions: {
    ...defaultHeader
  }
})

const HomeTabs = TabNavigator({
  ChatsTab: {
    screen: ChatsPage,
    navigationOptions: {
      tabBarLabel: 'Chats',
    }
  },
  EventsTab: {
    screen: EventsWithFilterStack,
    navigationOptions: {
      tabBarLabel: 'Events'
    }
  },
},
{
  tabBarComponent: TabBarTop,
  tabBarPosition: 'top',
  tabBarOptions: {
    ...defaultTabs
  }
})

const EventTabs = TabNavigator({
  EventDetails: {
    screen: EventDetails,
    navigationOptions: {
      tabBarLabel: 'Details'
    }
  },
  EventMessages: {
    screen: EventMessages,
    navigationOptions: {
      tabBarLabel: 'Messages'
    }
  },
  EventOther: {
    screen: EventOther,
    navigationOptions: {
      tabBarLabel: 'Other'
    }
  }
},
{
  tabBarComponent: TabBarTop,
  tabBarPosition: 'top',
  tabBarOptions: {
    ...defaultTabs
  }
})

const HomeStackSummary = StackNavigator({
  SummaryStack: {
    screen: HomeTabs,
    navigationOptions: ({ navigation }) => ({
      title: 'YABA',
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')} >
          <Ionicons name='md-menu' size={28} color={'white'} style={{paddingLeft: 12}}/>
        </TouchableOpacity>
      )
    })
  },
  Chat: {
    screen: Chat,
    navigationOptions: ({ navigation }) => ({
      title: `Chat with ${navigation.state.params.person.firstName}`
    })
  },
  Profile: {
    screen: Profile,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.person.firstName} ${navigation.state.params.person.lastName}`
    })
  },
  EventTabs: {
    screen: EventTabs,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.event.title}`
    })
  }
},{
  headerMode: 'screen',
  initialRouteName: 'SummaryStack',
  navigationOptions: {
    ...defaultHeader
  }
})

const CustomSearchStack = StackNavigator({
  CustomSearch: {
    screen: CustomSearch,
    navigationOptions: ({ navigation }) => ({
      header: <Search navigation={navigation}/>,
      // headerLeft: (
      //   <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')} >
      //     <Ionicons name='md-menu' size={28} color={'white'} style={{paddingLeft: 12}}/>
      //   </TouchableOpacity>
      // )
    })
  },
  Modal: {
    screen: Lightbox,
    navigationOptions: {
      header: null
    }
  }
},{
  mode: 'modal',
  headerMode: 'screen',
  navigationOptions: {
    ...defaultHeader
  }
})

const BottomTabs = TabNavigator({
  FirstTab: {
    screen: FirstTab
  },
  SecondTab: {
    screen: SecondTab,
  },
  ThirdTab: {
    screen: ThirdTab
  }
},
{
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    ...defaultTabs
  }
})

const BottomTabsStack = StackNavigator({
  BottomTabsLanding: {
    screen: BottomTabs,
    navigationOptions: ({ navigation }) => ({
      title: 'BOTTOM TABS',
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')} >
          <Ionicons name='md-menu' size={28} color={'white'} style={{paddingLeft: 12}}/>
        </TouchableOpacity>
      )
    })
  }
},{
  headerMode: 'screen',
  navigationOptions: {
    ...defaultHeader
  }
})

const MyProfileStack = StackNavigator({
  MyProfile: {
    screen: MyProfile,
    navigationOptions: ({ navigation }) => ({
      title: 'My Profile',
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')} >
          <Ionicons name='md-menu' size={28} color={'white'} style={{paddingLeft: 12}}/>
        </TouchableOpacity>
      )
    })
  }
},{
  headerMode: 'screen',
  navigationOptions: {
    ...defaultHeader
  }
})

const SignupStack = StackNavigator({
  SignupStart: {
    screen: SignupStart,
    navigationOptions: ({ navigation }) => ({
      title: 'Getting started',
      ...defaultHeader,
      headerLeft: (
        <TouchableOpacity
          onPress={() => {
            let resetAction = NavigationActions.reset({
              index: 0,
              actions: [ NavigationActions.navigate({ routeName: 'Login' }) ],
              key: null
            })
            navigation.dispatch(resetAction)
          }} >
          <Ionicons name='ios-arrow-back' size={28} color={'white'} style={{paddingHorizontal: 15}} />
        </TouchableOpacity>
      )
    })
  },
  SignupFinish: {
    screen: SignupFinish,
    navigationOptions: {
      title: 'Welcome!',
      ...defaultHeader
    }
  }
},{
  mode: 'card',
  headerMode: 'screen',
  transitionConfig: () => ({ screenInterpolator: () => null })
})

const DrawerNavigation = DrawerNavigator({
  Home: {
    screen: HomeStackSummary,
  },
  CustomSearch: {
    screen: CustomSearchStack,
  },
  // BottomTabs: {
  //   screen: BottomTabsStack,
  // },
  MyProfile: {
    screen: MyProfileStack,
  }
},
{
  initialRouteName: 'CustomSearch',
  contentComponent: ({ navigation }) =>
    <View style={styles.drawer}>
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <Image style={styles.logo} resizeMode='contain' source={require('./assets/icons/yaba_logo.png')} />
        </View>

        <ScrollView>
          <TouchableOpacity
             onPress={() => (navigation.state.index === 0 && navigation.state.routes[0].routes[0].index === 0) ?
               navigation.navigate('DrawerClose') : navigation.dispatch(
                 NavigationActions.navigate({
                   routeName: 'Home',
                   params: {},
                   action: NavigationActions.navigate({ routeName: 'ChatsTab' })
                 })
               ) }
              style={[styles.drawerItem, (navigation.state.index === 0 && navigation.state.routes[0].routes[0].index === 0) ? {backgroundColor: 'black'} : null]}>
            <Text style={styles.drawerText}>Chats</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => (navigation.state.index === 0 && navigation.state.routes[0].routes[0].index === 1) ?
              navigation.navigate('DrawerClose') : navigation.dispatch(
                NavigationActions.navigate({
                  routeName: 'Home',
                  params: {},
                  action: NavigationActions.navigate({ routeName: 'EventsTab' })
                })
              ) }
            style={[styles.drawerItem, (navigation.state.index === 0 && navigation.state.routes[0].routes[0].index === 1) ? {backgroundColor: 'black'} : null]}>
            <Text style={styles.drawerText}>Events</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.state.index === 1 ? navigation.navigate('DrawerClose') : navigation.navigate('CustomSearch')}
            style={[styles.drawerItem, navigation.state.index === 1 ? {backgroundColor: 'black'} : null]}>
            <Text style={styles.drawerText}>Custom search</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            onPress={() => navigation.state.index === 2 ? navigation.navigate('DrawerClose') : navigation.navigate('BottomTabs')}
            style={[styles.drawerItem, navigation.state.index === 2 ? {backgroundColor: 'black'} : null]}>
            <Text style={styles.drawerText}>Bottom Tabs</Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            onPress={() => navigation.state.index === 3 ? navigation.navigate('DrawerClose') : navigation.navigate('MyProfile')}
            style={[styles.drawerItem, navigation.state.index === 3 ? {backgroundColor: 'black'} : null]}>
            <Text style={styles.drawerText}>My Profile</Text>
          </TouchableOpacity>

          <Text>{JSON.stringify(navigation, null, '  ')}</Text>

        </ScrollView>
      </View>

      <TouchableOpacity
        style={styles.footer}
        onPress={() => {
          let resetAction = NavigationActions.reset({
            index: 0,
            actions: [
              NavigationActions.navigate({ routeName: 'Login' })
            ],
            key: null
          })
          navigation.dispatch(resetAction)
        }}>
        <Text style={styles.drawerText}>Logout</Text>
        <Ionicons
          name='md-exit'
          size={22}
          color='white'
        />
      </TouchableOpacity>

    </View>
})

const WrappedApp = StackNavigator({
  MainApp: {
    screen: DrawerNavigation,
    navigationOptions: {
      header: null
    }
  },
  TopFilter: {
    screen: TopFilter,
    navigationOptions: ({ navigation }) => ({
      ...defaultHeader,
      title: 'mode: Modal',
      headerLeft: null,
      headerRight: (
        <TouchableOpacity onPress={() => navigation.goBack()} >
          <Ionicons name='md-close' size={28} color={'white'} style={{paddingRight: 12}}/>
        </TouchableOpacity>
      )
    })
  }
},{
  mode: 'modal',
})

const MainNavigation = StackNavigator({
  Login: {
    screen: Login
  },
  Signup: {
    screen: SignupStack
  },
  App: {
    screen: WrappedApp
  }
},{
  initialRouteName: 'App',
  headerMode: 'none',
})

const styles = StyleSheet.create({
  searchinput: {
    flex: 1,
    height: 30,
    fontSize: 18,
    fontFamily: 'os-reg',
    color: '#2B2B2B',
    paddingHorizontal: 10,
    paddingTop: 6
  },
  drawer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'darkgray',
  },
  drawerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    borderBottomColor: 'rgba(0,0,0,.1)',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  drawerText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'state',
    padding: 14
  },
  header: {
    paddingTop: 20,
    paddingBottom: 5,
    backgroundColor: 'black',
    justifyContent: 'center',
    shadowColor: '#21292b',
    shadowOffset: { width: -2, height: 2 },
    shadowRadius: 2,
    shadowOpacity: .7,
    marginBottom: 8,
    elevation: 10
  },
  logo: {
    height: 60,
    width: 200,
    alignSelf: 'center',
    marginVertical: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  }
})

export default MainNavigation
