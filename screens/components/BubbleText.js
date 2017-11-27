import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  Animated,
  LayoutAnimation,
  TouchableOpacity,
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

const BubbleText = ({text, color}) => (
  <View style={[styles.box, { backgroundColor: color }]}>
    <Text style={styles.text}>{text}</Text>
  </View>
)

const styles = StyleSheet.create({
  box: {
    marginRight: 10,
    marginBottom: 4,
    paddingHorizontal: 16,
    paddingTop: 1,
    borderRadius: 11
  },
  text: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'os-reg'
  },
})

export default BubbleText
