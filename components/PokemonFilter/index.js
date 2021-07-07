
import React from 'react'
import { observer, useValue, usePage } from '@startupjs/react-sharedb'
import { Div, Multiselect, Tag } from '@startupjs/ui'

import './index.styl'
import { POKEMON_TYPES } from '../../const'

const PokemonFilter = observer(() => {
  const [filterValues, $filterValues] = usePage('filterValues')
  let [, $types] = useValue([])

  const handleTypesChange = val => {
    $filterValues.set(val)
    $types.set(val)
  }

  const renderTag = ({ record }) => {
    return pug`
      Tag(style=({backgroundColor: record.color})) #{record.label}
    `
  }

  return pug`
    Div.root
      Multiselect.multiselect(
        placeholder='Select types'
        value=filterValues
        onChange=handleTypesChange
        options=POKEMON_TYPES.map(type => ({ label: type.name.toUpperCase(), value: type.name, color: type.color }))
        TagComponent=renderTag
      )
  `
})

export default PokemonFilter
