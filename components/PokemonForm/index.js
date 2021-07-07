
import React, { useState } from 'react'
import { observer, useValue, useDoc, model, emit } from 'startupjs'
import { Div, Button, Tag, TextInput, NumberInput, Multiselect, Portal, Alert } from '@startupjs/ui'

import './index.styl'
import { POKEMON_TYPES } from '../../const'

const requiredFields = [
  {
    name: 'Pokemon name',
    value: 'name'
  },
  {
    name: 'Pokemon avatar',
    value: 'imageUrl'
  },
  {
    name: 'Pokemon types',
    value: 'types'
  }
]

const PokemonForm = observer((pokemon) => {
  const [alertField, setAlertField] = useState('')
  const [pokemonData] = useDoc('pokemons', pokemon.id)
  const [formValues, $formValues] = useValue(pokemonData ? { ...pokemonData } : {})

  const checkValidation = () => {
    return requiredFields.some(field => {
      let isInvalid = !formValues[field.value]
      setAlertField('Fill in required field - ' + field.name)
      return isInvalid
    })
  }

  const onSave = async () => {
    if (!checkValidation()) {
      if (pokemonData) {
        await model.set(`pokemons.${pokemon.id}`, formValues)
      } else {
        await model.add('pokemons', formValues)
      }
      emit('url', '/')
    }
  }

  const setFormValue = (key) => (value) => {
    $formValues.set(key, value)
  }

  const renderTag = ({ record }) => {
    return pug`
      Tag(style=({backgroundColor: record.color})) #{record.label}
    `
  }

  return pug`
    Div.wrapper
      Portal.Provider
        if alertField
          Alert(variant='error' label=alertField)
        TextInput.formItem.first(
          label='Name'
          placeholder='Name'
          onChangeText=setFormValue('name')
          value=formValues.name
        )
        TextInput.formItem(
          label='Avatar'
          placeholder='Image url'
          onChangeText=setFormValue('imageUrl')
          value=formValues.imageUrl
        )
        Div.formItem
          Multiselect(
            label='Types'
            placeholder='Select types'
            value=formValues.types
            onChange=setFormValue('types')
            options=POKEMON_TYPES.map(type => ({ label: type.name, value: type.name, color: type.color }))
            TagComponent=renderTag
          )
        NumberInput.formItem(
          label='Order'
          placeholder='Order'
          onChangeNumber=setFormValue('order')
          value=Number(formValues.order)
          buttons='horizontal'
          inputStyle={
            textAlign:'left',
          }
        )
        TextInput.formItem(
          label='Abilities'
          placeholder='Insert Abilities'
          value=formValues.abilities
          multiline=true
          numberOfLines=2
          onChangeText=setFormValue('abilities')
        )
        TextInput.formItem(
          label='Additional Info'
          placeholder='insert info'
          value=formValues.additionalInfo
          multiline=true
          numberOfLines=2
          onChangeText=setFormValue('additionalInfo')
        )
        Button.btn(
          color='primary'
          onPress=onSave
        ) Save
  `
})

export default PokemonForm
