import React from 'react'
import { ScrollView } from 'react-native'
import { observer } from 'startupjs'
import { Content } from '@startupjs/ui'

import PokemonForm from 'components/PokemonForm'
import './index.styl'

export default observer(function PokemonFormPage ({
  match: {
    params: { pokemonId }
  }
}) {
  return pug`
    ScrollView.root
      Content(width='desktop')
        PokemonForm(id=pokemonId)
  `
})
