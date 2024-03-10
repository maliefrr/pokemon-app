import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from '@/Pages/Home'
import PokemonDetail from '@/Pages/PokemonDetail'
import MyPokemon from '@/Pages/MyPokemon'


const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>
    },
    {
      path: "/pokemon/:pokemon",
      element: <PokemonDetail />
    },
    {
      path: "/mypokemon",
      element: <MyPokemon />
    }
    
])

const App = () => {
  return <RouterProvider router={router}/>
}

export default App