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
        <Image source={{uri: person.img}} style={styles.img} />
      </TouchableOpacity>
      <View style={{flex: 1}}>
        <Text style={styles.h2}>{person.firstName} {person.lastName.charAt(0)}.</Text>
        <Text
          numberOfLines={2}
          ellipsizeMode='tail'
          style={styles.p}>
          {person.about}
        </Text>
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
    fontWeight: "700",
    fontSize: 18,
    color: '#2B2B2B',
    margin: 4,
    paddingBottom: 12
  },
  p: {
    fontWeight: "300",
    fontSize: 18,
    color: '#2B2B2B',
    margin: 4,
    paddingBottom: 4
  },
  img: {
    width: 64,
    height: 64,
    margin: 12,
    borderRadius: 32
  }
})
