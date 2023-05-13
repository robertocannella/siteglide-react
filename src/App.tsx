
import { Grid, GridItem, Show } from '@chakra-ui/react'
import NavBar from './components/NavBar'
import ListingsList from './components/ListingsList'


function App() {

  return <Grid templateAreas={{
    base: `"nav" "main"`,
    lg: `"nav nav" "aside main"`
  }}>
      <GridItem area='nav'>Top Nav</GridItem>
      <Show above='lg'>
        <GridItem area='aside'>Aside</GridItem>
      </Show>
      <GridItem area='main'>
        <ListingsList />
      </GridItem>

  </Grid>
}

export default App
