import React from 'react'
import styled from 'styled-components/native'

import Avatar from './Avatar'
import Title from './Title'
import Card from './Card'

const PostListItem = ({ item, detail, navTo }) => (
  <Card onPress={() => navTo(item)}>
    <Title title={item.title} />
    <Avatar extraInfo={detail} {...item.author} />
  </Card>
)

export default PostListItem
