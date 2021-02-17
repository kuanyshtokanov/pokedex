import React from 'react'
import { ScrollView } from 'react-native'
import { observer } from 'startupjs'
import { Content, Div, Portal } from '@startupjs/ui'

import './index.styl'
import PokemonsList from 'components/PokemonsList'
import PokemonSearch from 'components/PokemonSearch'
import PokemonFilter from 'components/PokemonFilter'

export default observer(function PHome () {
  return pug`
    ScrollView.root
      Content(width='desktop')
        Div.section.first
          PokemonSearch
        Portal.Provider
          Div.section
            PokemonFilter
          Div.section
            PokemonsList
  `
})
