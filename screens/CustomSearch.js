import React from 'react'
import {
  Dimensions,
  Text,
  TextInput,
  View,
  ScrollView,
  StyleSheet,
  Modal,
  TouchableOpacity
} from 'react-native'
import { BlurView } from 'expo'
import {
  StackNavigator,
  TabNavigator,
  TabBarTop
} from 'react-navigation'
import {
  Ionicons
} from '@expo/vector-icons'
// import { withApollo, graphql, compose } from 'react-apollo'
// import { GetSearch, UpdateSearch } from '../apollo'

import CustomTabsComponent from './components/CustomTabsComponent'
import FirstTab from './FirstTab'
import SecondTab from './SecondTab'

const { height, width } = Dimensions.get('window')

const CustomTabs = TabNavigator({
  People: {
    screen: FirstTab,
  },
  Places: {
    screen: SecondTab,
  }
},{
  tabBarComponent: CustomTabsComponent,
  tabBarPosition: 'top'
})

export default class CustomSearch extends React.Component {
  static router = CustomTabs.router

  render() {
    let { data, navigation } = this.props

    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <CustomTabs navigation={navigation} />

        <Modal
          animationType='slide'
          transparent={true}
          visible={
            !!navigation.state.params && !!navigation.state.params.showModal
            ? navigation.state.params.showModal
            : false}>
            <BlurView
              tint="dark"
              intensity={80}
              style={{ flex: 1 }}>
              <View style={{ flex: 1, margin: 30, marginTop: 60, backgroundColor: 'white' }}>
                <TouchableOpacity
                  onPress={() => navigation.setParams({ showModal: false })}>
                  <Ionicons name='ios-close-circle' size={28} color={'black'} style={{ textAlign: 'right', padding: 12}}/>
                </TouchableOpacity>

                <Text>Filter options and such</Text>
              </View>
            </BlurView>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  searchbar: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 3,
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 5,
    shadowColor: 'grey',
    shadowOpacity: 0.9,
    shadowRadius: 2,
    shadowOffset: {
      height: 0,
      width: 0
    }
  },
  searchinput: {
    flex: 1,
    height: 30,
    fontSize: 18,
    fontFamily: 'os-reg',
    color: '#2B2B2B',
    paddingHorizontal: 10,
    paddingTop: 6
  }
})
