import React from 'react'
import {
  AsyncStorage,
  Platform,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  View,
  Text,
  Image,
  TextInput,
  Alert,
  TouchableOpacity
} from 'react-native'

export default class Login extends React.Component {
  state = {
    isLoading: false,
    email: null,
    password: null
  }

  login = () => {
    this.props.navigation.navigate('App')
  }

  signup = () => {
    this.props.navigation.navigate('Signup')
  }

  focusNext = (nextField) => {
    this.refs[nextField].focus()
  }

  render() {
    if(this.state.isLoading) {
      return (
        <View style={{flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator
            animating={true}
            size="large"
            color='white'
          />
        </View>
      )
    } else {
      return (
        <View style={{flex: 1, backgroundColor: 'black', padding: 12}}>
          <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center', padding: 25}}>
            <Image source={require('../assets/icons/yaba_logo.png')} style={{width: 150, height: 150}}/>
            <Text style={styles.header}>YABA</Text>
          </View>
          <KeyboardAvoidingView
            style={{flex: 1, justifyContent: 'flex-end'}}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={{borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'white'}}>
              <TextInput
                ref='email'
                style={styles.input}
                placeholderTextColor={'white'}
                autoCapitalize={'none'}
                autoCorrect={false}
                onChangeText={(email) => this.setState({email})}
                maxLength={60}
                blurOnSubmit={true}
                keyboardType={'email-address'}
                returnKeyType={'next'}
                placeholder={'Enter your email'}
                value={this.state.email}
                onSubmitEditing={() => this.focusNext('password')}
              />
            </View>

            <View style={{borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'white', paddingTop: 20, marginBottom: 6}}>
              <TextInput
                ref='password'
                style={styles.input}
                placeholderTextColor={'white'}
                autoCapitalize={'none'}
                autoCorrect={false}
                returnKeyType={'done'}
                secureTextEntry={true}
                onChangeText={(password) => this.setState({password})}
                maxLength={30}
                blurOnSubmit={true}
                placeholder={'Password'}
                value={this.state.password}
              />
            </View>
          </KeyboardAvoidingView>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              style={styles.option}>
              <Text style={styles.optionText}>Forgot password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.option}
              onPress={this.signup}>
              <Text style={styles.optionText}>Create account</Text>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={styles.button}
              onPress={this.login}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 28,
    marginVertical: 12,
    fontFamily: 'nemoy-light',
    color: 'white'
  },
  input: {
    height: 36,
    color: 'white',
    fontSize: 18,
  },
  button: {
    flex: 1,
    padding: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 4,
    borderColor: 'white'
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'nemoy-medium',
    fontSize: 18
  },
  option: {
    margin: 4,
    paddingVertical: 12
  },
  optionText: {
    color: 'white',
    fontSize: 14
  }
})
