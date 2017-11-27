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
import { Ionicons } from '@expo/vector-icons'

export default function PlacesListItem({ place }) {
  return (
    <View style={styles.card}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={styles.h2}>{place.name}</Text>
        <Text style={styles.p}>{place.location} ({place.color})</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 8,
  },
  h2: {
    fontFamily: 'os-reg',
    fontSize: 18,
    color: '#2B2B2B'
  },
  p: {
    fontFamily: 'os-lite',
    fontSize: 18,
    color: '#2B2B2B'
  }
})
