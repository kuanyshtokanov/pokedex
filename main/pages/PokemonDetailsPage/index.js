import React from 'react'
import { ScrollView } from 'react-native'
import { observer, useDoc } from 'startupjs'
import { Content } from '@startupjs/ui'

import './index.styl'
import PokemonDetails from 'components/PokemonDetails'

export default observer(function PokemonDetailsPage ({
  match: {
    params: { pokemonId }
  }
}) {
  const [pokemon] = useDoc('pokemons', pokemonId)

  // console.log(pokemon)

  return pug`
    ScrollView.root
      Content(width='desktop').wrapper
        PokemonDetails(data=pokemon detailForm)
  `
})
