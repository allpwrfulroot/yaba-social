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
    isLoading: true,
    email: null,
    password: null
  }

  componentWillMount() {
    this.getInfo()
  }

  getInfo = async() => {
    try {
      const values = await AsyncStorage.multiGet(['Token', 'User'])
      console.log('Looking for token and user, got ', values)
      if (values[0][1] !== null) {
        console.log('Token found in AsyncStorage, proceeding to App')
        this.props.navigation.navigate('App')
      } else {
        console.log('no token found in AsyncStorage, proceeding to Login')
        this.setState({isLoading: false})
      }
    } catch (error) {
      console.log('Error in getInfo: ', error)
    }
  }

  storeInfo = async(info) => {
    console.log('info for storeInfo: ', info.token)
    AsyncStorage.multiSet([['Token', info.token], ['User', info.user.id]], err => {
      if (err) {
        console.log('Error in Login -> storeInfo: ', err)
      }
      else {
        console.log('OK from storeInfo')
        this.props.navigation.navigate('SubNav')
      }
    })
  }

  signup = () => {
    let re = /\S+@\S+\.\S+/
    if (this.state.password && this.state.password.length >= 6 && this.state.email && re.test(this.state.email)) {
      console.log('Valid credentials!')
      this.props.client.query({
        query: DoesUserExistQuery,
        variables: {
          email: this.state.email
        }
      })
      .then( response => {
        console.log('response from doesUserExist: ', response)
        if(response.data.User && response.data.User.id){
          Alert.alert('Error', 'That email is already in use')
        } else {
          let creds = {
            email: this.state.email,
            password: this.state.password
          }
          this.props.navigation.navigate('Signup', creds)
        }
      })
      .catch( error => console.log('error in doesUserExist: ', error.message))
    } else {
      Alert.alert('Invalid credentials!', 'Need a valid email and password >5 characters')
    }
  }

  login = () => {
    let re = /\S+@\S+\.\S+/  //checks for reasonable email format
    if (this.state.password && this.state.password.length >= 6 && this.state.email && re.test(this.state.email)) {
      console.log('Valid credentials!')
      let creds = {
        email: this.state.email,
        password: this.state.password
      }
      this.props.login(creds)
      .then( res => {
        // console.log('login: ', res)
        this.storeInfo(res.data.signinUser)
      })
      .catch( err => {
        // console.log('error: ', err)
        Alert.alert('Error!', err.message)
      })
    } else {
      Alert.alert('Invalid credentials!')
    }
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
