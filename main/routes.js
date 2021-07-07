export default (components = {}) => [
  {
    path: '/',
    exact: true,
    component: components.PHome
  },
  {
    path: '/pokemon/:pokemonId',
    exact: true,
    component: components.PokemonDetailsPage
  },
  {
    path: '/pokemon/form/new',
    exact: true,
    component: components.PokemonFormPage
  },
  {
    path: '/pokemon/form/edit/:pokemonId',
    exact: true,
    component: components.PokemonFormPage
  }
]
