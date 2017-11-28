import React from 'react'
import {
  ActivityIndicator,
  Text,
  Image,
  StyleSheet,
  SectionList,
  View,
  TouchableOpacity,
} from 'react-native'
import ChatListItem from './components/ChatListItem'

const MOCK_USERS = [
  {id: 28342841980, active: true, img: 'https://randomuser.me/api/portraits/thumb/men/71.jpg', firstName: 'Scott', lastName: 'Bell', about: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.', interests: ['skiing', 'snowboarding', 'ice hockey']},
  {id: 18039582801, active: false, img: 'https://randomuser.me/api/portraits/thumb/women/78.jpg', firstName: 'Nevaeh', lastName: 'Jones', about: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.', interests: ['cocktails', 'brunch', 'roofdeck']},
  {id: 99284727871, active: true, img: 'https://randomuser.me/api/portraits/thumb/men/32.jpg', firstName: 'Frank', lastName: 'Mitchell', about: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.', interests: ['design', 'arts', 'museums']},
  {id: 42983294089, active: true, img: 'https://randomuser.me/api/portraits/thumb/women/5.jpg', firstName: 'Julie', lastName: 'King', about: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?', interests: ['races', 'car shows', 'moto sports']},
  {id: 23874871897, active: true, img: 'https://randomuser.me/api/portraits/thumb/women/33.jpg', firstName: 'Christine', lastName: 'Moore', about: 'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?', intersts: ['dance', 'ballet', 'opera']},
  {id: 59837167162, active: true, img: 'https://randomuser.me/api/portraits/thumb/men/18.jpg', firstName: 'Kyle', lastName: 'Walker', about: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.', interests: ['dance', 'hip-hop', 'DJs']},
  {id: 82736176162, active: true, img: 'https://randomuser.me/api/portraits/thumb/women/6.jpg', firstName: 'Mildred', lastName: 'Grant', about: 'Et harum quidem rerum facilis est et expedita distinctio.', interests: ['ballet', 'opera', 'brunch']},
  {id: 81216476267, active: false, img: 'https://randomuser.me/api/portraits/thumb/men/42.jpg', firstName: 'Richard', lastName: 'Dunn', about: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.', interests: ['photography', 'sculpure', 'gardens']},
  {id: 73167165165, active: true, img: 'https://randomuser.me/api/portraits/thumb/men/50.jpg', firstName: 'Leslie', lastName: 'Knox', about: 'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.', interests: ['restaurants', 'cocktails', 'bars']},
  {id: 28342743874, active: true, img: 'https://randomuser.me/api/portraits/thumb/women/46.jpg', firstName: 'Jessica', lastName: 'Larson', about: 'Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.', interests: ['walks', 'tours', 'museums']},
  {id: 31972487282, active: true, img: 'https://randomuser.me/api/portraits/thumb/women/36.jpg', firstName: 'Morgan', lastName: 'Soto', about: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.', interests: ['arts', 'dance', 'standup']},
  {id: 41984753877, active: false, img: 'https://randomuser.me/api/portraits/thumb/men/99.jpg', firstName: 'Alberto', lastName: 'James', about: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.', interests: ['DJs', 'restaurants', 'roofdeck']},
  {id: 12837189722, active: true, img: 'https://randomuser.me/api/portraits/thumb/men/91.jpg', firstName: 'Ross', lastName: 'Diaz', about: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.', interests: ['races', 'monster trucks', 'nascar']},
  {id: 38052981783, active: true, img: 'https://randomuser.me/api/portraits/thumb/men/89.jpg', firstName: 'Adrian', lastName: 'Baker', about: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?', interests: ['arts', 'photography', 'museums']}
]

export default class ChatsPage extends React.Component {
  state = {
    data: []
  }

  componentWillMount = async() => {
    let sectionedData = [
      { data: [], title: 'Active' },
      { data: [], title: 'Inactive' }
    ]
    await MOCK_USERS.forEach(user => {
      if(user.active) {
        sectionedData[0].data.push(user)
      } else {
        sectionedData[1].data.push(user)
      }
    })
    this.setState({ data: sectionedData })
  }

  goToProfile = person =>
    this.props.navigation.navigate('Profile', { person })

  goToChat = (person, request) =>
    this.props.navigation.navigate('Chat', { person })

  _renderItem = ({ item }) =>
    <ChatListItem
      person={item}
      goToProfile={this.goToProfile}
      goToChat={this.goToChat}
    />

  _renderSectionHeader = ({ section }) =>
    <Text style={styles.sectionHeader}>{section.title}</Text>

  _keyExtractor = (item) => item.id

  _separator = () => <View style={styles.separator} />

  render() {
    return (
      <SectionList
        sections={this.state.data}
        keyExtractor={this._keyExtractor}
        renderSectionHeader={this._renderSectionHeader}
        renderItem={this._renderItem}
        ItemSeparatorComponent={this._separator}
      />
    )
  }
}

const styles = StyleSheet.create({
  sectionHeader: {
    fontFamily: 'os-bold',
    fontSize: 16,
    padding: 12,
    backgroundColor: 'lightgrey'
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    alignSelf: 'stretch',
    backgroundColor: 'lightgray',
  }
})
