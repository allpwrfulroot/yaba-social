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

export default function PeopleListItem({ person }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: person.img }} style={styles.img} />
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={styles.h2}>{person.firstName} {person.lastName} ({person.team})</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row'
  },
  h2: {
    fontFamily: 'os-reg',
    fontSize: 18,
    color: '#2B2B2B',
    margin: 4,
    paddingBottom: 12
  },
  p: {
    fontFamily: 'os-lite',
    fontSize: 18,
    color: '#2B2B2B',
    margin: 4,
    paddingBottom: 4
  },
  img: {
    width: 36,
    height: 36,
    margin: 12,
    borderRadius: 18
  }
})
