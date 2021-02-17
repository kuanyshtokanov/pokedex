import React from 'react'
import { Text } from 'react-native'
import { emit } from 'startupjs'
import { Div, Span, Avatar, Card, Tag } from '@startupjs/ui'

import { POKEMON_TYPES } from '../../const'
import './index.styl'

const PokemonCard = ({
  data: { id, name, imageUrl, order, types, abilities, additionalInfo }
}) => {
  const onCardClick = () => {
    console.log('Card ' + name + ' clicked')
    emit('url', '/pokemon/' + id)
  }

  return pug`
    Card.wrapper(onPress=onCardClick)
      Div.cardItem.first
        Avatar.avatar( size='xxl' src=imageUrl )
      Div.cardItem
        Span.order='#'+order
      Div.cardItem
        Span.name=name
      Div.cardItem
        if types
          Div.types
            each type, index in types
              Tag.tag(styleName=[{first: index===0}] key=index style=({ backgroundColor: (POKEMON_TYPES.find(t=> t.name === type) || []).color })) #{type.toUpperCase()}
      Div.cardItem
        Span=additionalInfo
      Div.cardItem
        Div.abilities
          Text.abilitiesTxt=abilities
  `
}

export default PokemonCard
