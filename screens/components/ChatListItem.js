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

export default function ChatListItem({ person, goToProfile, goToChat }) {
  return (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => goToProfile(person)}>
        <Image source={{uri: person.picture.thumbnail}} style={styles.img} />
      </TouchableOpacity>
      <View style={{flex: 1}}>
        <Text style={styles.h2}>{person.name.first} {person.name.last.charAt(0)}.</Text>
        {/* <Text
          numberOfLines={2}
          ellipsizeMode='tail'
          style={styles.p}>
          {person.about}
        </Text> */}
      </View>
      <TouchableOpacity
        onPress={() => goToChat(person)}
        style={{justifyContent: 'center', padding: 6}}
      >
        <FontAwesome
          name='chevron-right'
          size={32}
          color='black'
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#eff3f3',
    flexDirection: 'row'
  },
  h2: {
    fontFamily: 'os-bold',
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
