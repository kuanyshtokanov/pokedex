import React from 'react'
import { model, emit } from 'startupjs'
import { Div, Span, Avatar, Card, Tag, Button } from '@startupjs/ui'

import { POKEMON_TYPES } from '../../const'
import './index.styl'

const PokemonCard = ({
  data: { id, name, imageUrl, order, types, abilities, additionalInfo },
  detailForm
}) => {
  const onEditClick = () => {
    emit('url', '/pokemon/form/edit/' + id)
  }

  const onDeleteClick = async () => {
    emit('url', '/')
    await model.del('pokemons.' + id)
  }

  return pug`
    Card.wrapper(styleName=[{detailForm}])
      Div.top
        Span.name=name
        if order
          Span.order='#'+order
      Div.middle
        Div.avatar
          Avatar.avatarImg( size='xxl' src=imageUrl )
        Div.right
          Div.additionalInfo
            Span.additionalInfoTxt=additionalInfo
          if types
            Div.types
              Span.typesLabel='Types:'
              each type, index in types
                Tag.tag(styleName=[{first: index===0}] key=index style=({ backgroundColor: (POKEMON_TYPES.find(t=> t.name === type) || []).color })) #{type.toUpperCase()}
          Div.abilities
            Span.abilitiesLabel='Abilities:'
            Span.abilitiesTxt=abilities
          Div.buttons
            Button.btn(
              onPress=onEditClick
            ) Edit
            Button.btn.last(
              onPress=onDeleteClick
            ) Delete
  `
}

export default PokemonCard
