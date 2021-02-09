
import React, { useState } from 'react'
import { observer, usePage, useQuery } from 'startupjs'
import { Div, Pagination, Select } from '@startupjs/ui'

import './index.styl'

const pageSizes = [6, 12]

const PokemonsPagination = observer(() => {
  const [curPage, setPage] = useState()
  const [curPagesSize, setCurPageSize] = useState(6)
  const [, $page] = usePage('page')
  const [pageSize = 6, $pageSize] = usePage('pageSize')
  const [search] = usePage('search')
  const [filterValues = []] = usePage('filterValues')

  const $match = {
    _type: { $ne: null }
  }

  if (search) {
    console.log('search', search)
    $match.name = { $regex: search, $options: 'i' }
  }
  if (filterValues.length) {
    console.log('filters', filterValues)
    $match.types = { $in: filterValues }
  }

  const [[{ count = 0 } = {}]] = useQuery('pokemons', {
    $aggregate: [
      { $match },
      { $count: 'count' }
    ]
  })
  console.log('count', count)

  const onPageChange = (val) => {
    $page.set(val)
    setPage(val)
  }

  const onPageSizeChange = (val) => {
    $pageSize.set(val)
    setCurPageSize(val)
  }

  return pug`
    Div.root
      Pagination(
        variant='compact'
        page=curPage
        pages=Math.ceil(count / pageSize)
        onChangePage=onPageChange
      )
      Select(
        value=curPagesSize
        onChange=onPageSizeChange
        options=pageSizes
        showEmptyValue=false
      )
  `
})

export default PokemonsPagination
