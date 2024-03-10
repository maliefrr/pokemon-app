import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from '@/Pages/Home'
import PokemonDetail from '@/Pages/PokemonDetail'


const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>
    },
    {
      path: "/pokemon/:pokemon",
      element: <PokemonDetail />
    }
    
])

const App = () => {
  return <RouterProvider router={router}/>
}

export default App