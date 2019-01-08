import Expo, { AppLoading, Asset, Font, Constants } from 'expo'
import React from 'react'
import { Platform, StatusBar, View } from 'react-native'
import { ThemeProvider } from 'styled-components'
import { ApolloProvider } from 'react-apollo'

import { client, theme } from './utils'
import AppNav from './navigation'

export default class App extends React.Component {
  state = {
    isLoading: true,
  }

  componentWillMount() {
    this._loadAssetsAsync()
  }

  cacheImages = images => {
    return images.map(image => {
      if (typeof image === 'string') {
        return Image.prefetch(image)
      } else {
        return Asset.fromModule(image).downloadAsync()
      }
    })
  }

  cacheFonts = fonts => {
    return fonts.map(font => Font.loadAsync(font))
  }

  async _loadAssetsAsync() {
    const imageAssets = this.cacheImages([
      require('./assets/icons/app.png'),
      require('./assets/icons/loading.png'),
      require('./assets/icons/yaba_logo.png'),
    ])
    const fontAssets = this.cacheFonts([
      { 'os-bold': require('./assets/fonts/OpenSans-Bold.ttf') },
      { 'os-reg': require('./assets/fonts/OpenSans-Regular.ttf') },
      { 'os-lite': require('./assets/fonts/OpenSans-Light.ttf') },
    ])
    await Promise.all([...imageAssets, ...fontAssets])
    this.setState({ isLoading: false })
  }

  render() {
    if (this.state.isLoading) {
      return <AppLoading />
    }
    return (
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <View style={{ flex: 1 }}>
            {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
            <AppNav screenProps={{ theme }} />
          </View>
        </ApolloProvider>
      </ThemeProvider>
    )
  }
}
