import Expo, { AppLoading, Asset, Font, Constants } from 'expo'
import React from 'react'
import { Platform, StatusBar, View } from 'react-native'

// Really annoying warning, expect it'll go away with v19 or so
// console.ignoredYellowBox = ['Warning: checkPropTypes']
import { ApolloProvider } from 'react-apollo'
import client from './apollo'
import MainNav from './navigation'

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
      {'state': require('./assets/fonts/BenchNine-Regular.ttf')},
      {'os-bold': require('./assets/fonts/OpenSans-Bold.ttf')},
      {'os-reg': require('./assets/fonts/OpenSans-Regular.ttf')},
      {'os-lite': require('./assets/fonts/OpenSans-Light.ttf')}
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
      <ApolloProvider client={client}>
        <View style={{flex: 1}}>
          {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
          {Platform.OS === 'android' && <View style={{ height: Constants.statusBarHeight, backgroundColor: 'rgba(0,0,0,0.2)' }} />}
          <MainNav />
        </View>
      </ApolloProvider>
    )
  }
}
