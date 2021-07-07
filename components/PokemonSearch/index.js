
import React, { useCallback } from 'react'
import { observer, useValue, usePage } from 'startupjs'
import { Div, TextInput } from '@startupjs/ui'
import _ from 'lodash'
import './index.styl'

const PokemonSearch = observer(() => {
  const [searchValue, $searchValue] = useValue()
  const [, $search] = usePage('search')

  const setSearchPage = useCallback(_.throttle(val => {
    if (val.length > 2) {
      console.log(val)
      $search.set(val)
    } else {
      $search.set('')
    }
  }, 600), [])

  const setSeatchValue = val => {
    $searchValue.set(val)
    setSearchPage(val)
  }

  return pug`
    Div.wrapper
      TextInput.searchInput(placeholder='Search pokemon' onChangeText=setSeatchValue value=searchValue)
  `
})

export default PokemonSearch
