import Expo, { AppLoading, Asset, Font, Constants } from 'expo'
import React from 'react'
import { Platform, StatusBar, View } from 'react-native'

// Really annoying warning, expect it'll go away with v19 or so
console.ignoredYellowBox = ['Warning: checkPropTypes']

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
      <View style={{flex: 1}}>
        {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
        {Platform.OS === 'android' && <View style={{ height: Constants.statusBarHeight, backgroundColor: 'rgba(0,0,0,0.2)' }} />}
        <MainNav />
      </View>
    )
  }
}
