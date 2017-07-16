import Expo, { AppLoading, Asset, Font, Constants } from 'expo'
import React from 'react'
import { Platform, StatusBar, View } from 'react-native'
// import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
// import { ApolloProvider } from 'react-apollo'
// import makeApolloClient from './apollo'

// Really annoying warning, expect it'll go away with v19 or so
console.ignoredYellowBox = ['Warning: checkPropTypes']

import MainNav from './navigation'
import config from './config'
// const client = makeApolloClient(config.graphqlUrl, config.subscriptionUrl)
//
// import { locationReducer } from './data/locationReducer'
// const store = createStore(
//   combineReducers({
//     location: locationReducer,
//     apollo: client.reducer()
//   }),
//   { location: null },
//   compose(
//     applyMiddleware(client.middleware())
//   )
// )

export default class App extends React.Component {
  state = {
    isLoading: true
  }

  componentWillMount() {
    this._loadAssetsAsync()
  }

  cacheImages = (images) => {
    return images.map(image => {
      if (typeof image === 'string') {
        return Image.prefetch(image)
      } else {
        return Asset.fromModule(image).downloadAsync()
      }
    })
  }

  cacheFonts = (fonts) => {
    return fonts.map(font => Font.loadAsync(font))
  }

  async _loadAssetsAsync() {
    const imageAssets = this.cacheImages([
      require('./assets/icons/app.png'),
      require('./assets/icons/loading.png'),
      require('./assets/icons/yaba_logo.png')
    ])
    const fontAssets = this.cacheFonts([
      {'nemoy-bold': require('./assets/fonts/NemoyBold.otf')},
      {'nemoy-medium': require('./assets/fonts/NemoyMedium.otf')},
      {'nemoy-light': require('./assets/fonts/NemoyLight.otf')}
    ])
    await Promise.all([
      ...imageAssets,
      ...fontAssets,
    ])
    this.setState({ isLoading: false })
  }

  render() {
    if(this.state.isLoading) {
      return <AppLoading />
    }
    return (
      // <ApolloProvider client={client} store={store} >
        <View style={{flex: 1}}>
          {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
          {Platform.OS === 'android' && <View style={{ height: Constants.statusBarHeight, backgroundColor: 'rgba(0,0,0,0.2)' }} />}
          <MainNav />
        </View>
      // </ApolloProvider>
    )
  }
}
