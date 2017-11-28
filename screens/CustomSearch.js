import React from 'react'
import {
  Alert,
  Dimensions,
  Text,
  TextInput,
  View,
  StyleSheet,
  Modal,
  TouchableOpacity
} from 'react-native'
import { BlurView } from 'expo'
import {
  StackNavigator,
  TabNavigator,
  TabBarTop,
  NavigationActions
} from 'react-navigation'
import { graphql, compose } from 'react-apollo'
import { GetFilters, UpdateFilters } from '../apollo'
import {
  Ionicons
} from '@expo/vector-icons'

import CustomTabsComponent from './components/CustomTabsComponent'
import PeopleTab from './PeopleTab'
import PlacesTab from './PlacesTab'

// const { height, width } = Dimensions.get('window')

const CustomTabs = TabNavigator({
  People: {
    screen: PeopleTab
  },
  Places: {
    screen: PlacesTab
  }
},{
  tabBarComponent: CustomTabsComponent,
  tabBarPosition: 'top'
})

class CustomSearch extends React.Component {
  static router = CustomTabs.router

  state = {
    filters: []
  }

  _updateFilter = (color) => {
    let filters = this.state.filters.slice()
    if(filters.includes(color)) {
      filters = filters.filter(x => x !== color)
    } else {
      filters.push(color)
    }
    this.setState({ filters })
  }

  _onClearFilter = async () => {
    await this.setState({ filters: [] })
    this._onSelectFilter()
  }

  _onSelectFilter = async () => {
    console.log('state: ', this.state)
    try {
      const updated = await this.props.mutate({
        query: UpdateFilters,
        variables: {
          search: this.props.data.getFilters.search,
          filters: this.state.filters
        }
      })
      this.props.navigation.setParams({ showModal: false })
    } catch (err) {
      Alert.alert('Oops', err)
    }
  }

  render() {
    let { error, loading, getFilters } = this.props.data
    let { navigation } = this.props

    if(loading) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    } else if(getFilters) {
      const options = ['red','yellow','green','blue']

      return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
          {
            getFilters.filters.length > 0 &&
            <View style={{ flexDirection: 'row', paddingHorizontal: 12, paddingTop: 8 }}>
              <Text>Current filters: {getFilters.filters.join(', ')}</Text>
            </View>
          }

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
                intensity={90}
                style={{ flex: 1, padding: 30, paddingTop: 60 }}>
                <View style={{ backgroundColor: 'white', padding: 8, borderRadius: 4 }}>
                  <TouchableOpacity
                    onPress={() => navigation.setParams({ showModal: false })}>
                    <Ionicons name='ios-close-circle' size={28} color={'black'} style={{ textAlign: 'right', paddingRight: 8}}/>
                  </TouchableOpacity>

                  <Text>Filter options:</Text>
                  {
                    options.map(color =>
                      <TouchableOpacity
                        key={color}
                        onPress={() => this._updateFilter(color)}
                        style={[styles.button, { backgroundColor: color }]}>
                        <Text style={styles.text}>{color}</Text>
                        <Ionicons
                          name={this.state.filters.includes(color)
                            ? "ios-checkmark-circle"
                            : "ios-checkmark-circle-outline"}
                          color='white'
                          size={28} />
                      </TouchableOpacity>
                    )
                  }

                  <View style={{ flexDirection: 'row', marginTop: 8 }}>
                    <TouchableOpacity
                      onPress={this._onClearFilter}
                      style={styles.button}>
                      <Text style={styles.text}>Clear filters</Text>
                    </TouchableOpacity>
                    <Text> </Text>
                    <TouchableOpacity
                      onPress={this._onSelectFilter}
                      style={styles.button}>
                      <Text style={styles.text}>Update lists</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </BlurView>
          </Modal>
        </View>
      )
    } else {
      return (
        <View>
          <Text>Error!</Text>
          <Text>{JSON.stringify(error)}</Text>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'grey'
  },
  text: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'os-reg'
  },
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
    // flex: 1,
    height: 30,
    fontSize: 18,
    fontFamily: 'os-reg',
    color: '#2B2B2B',
    paddingHorizontal: 10,
    paddingTop: 6
  }
})

export default compose(
  graphql(GetFilters),
  graphql(UpdateFilters)
)(CustomSearch)
