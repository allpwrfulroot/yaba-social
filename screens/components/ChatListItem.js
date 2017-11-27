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

export default function ChatListItem({ person, goToProfile, goToChat }) {
  return (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => goToProfile(person)}>
        <Image source={{ uri: person.img }} style={styles.img} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => goToChat(person)}
        style={{ flexDirection: 'row', flex: 1 }}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.h2}>{person.firstName} {person.lastName}</Text>
          <Text
            numberOfLines={2}
            ellipsizeMode='tail'
            style={styles.p}>
            {person.about}
          </Text>
        </View>
        <View style={{ width: 30, justifyContent: 'center' }}>
          <Ionicons name="ios-arrow-forward" size={28} />
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    paddingVertical: 8,
    backgroundColor: 'white'
  },
  h2: {
    fontFamily: 'os-reg',
    fontSize: 18,
    color: '#2B2B2B',
    paddingBottom: 4,
    flex: 1
  },
  p: {
    fontFamily: 'os-lite',
    fontSize: 18,
    color: '#2B2B2B'
  },
  img: {
    width: 36,
    height: 36,
    margin: 8,
    borderRadius: 18
  }
})
