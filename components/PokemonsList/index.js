import React from 'react'
import { observer, useQuery, usePage } from 'startupjs'
import { Div } from '@startupjs/ui'

import './index.styl'
import PokemonCard from '../PokemonCard'
import Pagination from '../Pagination'

const PokemonsList = observer(() => {
  const [search = ''] = usePage('search')
  const [page = 0] = usePage('page')
  const [pageSize = 6] = usePage('pageSize')
  const [filterValues = []] = usePage('filterValues')

  const query = {}
  if (search) {
    query.name = search
  }
  if (filterValues.length) {
    query.types = { $in: filterValues }
  }
  query.$sort = { order: 1 }
  query.$skip = page * pageSize
  query.$limit = pageSize

  const [pokemons = []] = useQuery('pokemons', query)

  console.log('PokemonsList', pokemons)
  return pug`
    Div.root
      Div.wrapper
        each pokemon, index in pokemons
          PokemonCard(key=pokemon.id data=pokemon)
      Div.pagination
        Pagination(pokemons=pokemons)
  `
})

export default PokemonsList
