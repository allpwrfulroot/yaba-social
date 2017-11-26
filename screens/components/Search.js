import React, { Component } from 'react'
import { View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { withApollo, graphql, compose } from 'react-apollo'
import { GetSearch, UpdateSearch } from '../../apollo'

class Search extends Component {
  state = {
    search: ''
  }

  componentDidMount = async () => {
    const initial = await this.props.client.query({ query: GetSearch })
    this.setState({ search: initial.data.getSearch.search })
  }

  _onSubmitSearch = async () => {
    try {
      const updated = await this.props.client.mutate({
        mutation: UpdateSearch,
        variables: { search: this.state.search }
      })
      // console.log(updated)
    } catch (err) {
      Alert.alert('Oops', err)
    }
  }

  render () {
    let { navigation } = this.props
    return (
      <View style={styles.searchbar}>
        <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')} >
           <Ionicons name='md-menu' size={28} color={'white'} style={{paddingHorizontal: 12}}/>
        </TouchableOpacity>

        <TextInput
          returnKeyType='search'
          onChangeText={(search) => this.setState({ search })}
          placeholder='Search'
          placeholderTextColor='lightgrey'
          onSubmitEditing={this._onSubmitSearch}
          value={this.state.search}
          style={styles.searchinput}
        />

        <TouchableOpacity onPress={() => navigation.setParams({ showModal:
          !!navigation.state.params && !!navigation.state.params.showModal
          ? !navigation.state.params.showModal
          : true
        })} >
           <Ionicons name='md-switch' size={28} color={'white'} style={{paddingHorizontal: 12}}/>
        </TouchableOpacity>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  searchbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: '#2B2B2B'
  },
  searchinput: {
    flex: 1,
    height: 30,
    fontSize: 18,
    fontFamily: 'os-reg',
    color: 'white',
    paddingHorizontal: 12,
    marginVertical: 4,
    backgroundColor: 'darkgrey',
    borderRadius: 8
  }
})

export default compose(
  withApollo
)(Search)
