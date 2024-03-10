import Layout from '@/components/Layout'
import { Card, CardContent } from '@/components/ui/card'
import { useEffect, useState } from 'react';
import axios from 'axios';

interface pokemonPayload {
    count: number;
    next: string | null,
    previous: string | null,
    results: [{
        name: string;
        url: string;
    }]
}

const Home = () => {
  const [pokemon,setPokemon] = useState<pokemonPayload>()
  const [offset,setOffset] = useState(0)
  const fetchData = async () => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}`)
        setPokemon(response.data)
    } catch (error) {
        console.log((error as Error).message)
    }
  }
  useEffect(() => {
    fetchData()
  },[offset])
  console.log(pokemon)
  return (
    <Layout>
      <div className="grid grid-cols-2 gap-4 mt-3 mb-3">
        {pokemon?.results.map((item) => (
            <Card>
                <CardContent>
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${item.url
                    .slice(34)
                    .replace(/\/+$/, "")}.svg`} alt={item.name} />
                    <p>{item.name}</p>
                </CardContent>
            </Card>
        ))}
      </div>
      <div className="col-span-2 flex justify-between mb-3">
        <button onClick={() => setOffset(offset - 20)}>
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 192 512" className="h-10 w-10 cursor-pointer text-black dark:text-white" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M192 127.338v257.324c0 17.818-21.543 26.741-34.142 14.142L29.196 270.142c-7.81-7.81-7.81-20.474 0-28.284l128.662-128.662c12.599-12.6 34.142-3.676 34.142 14.142z"></path>
            </svg>
        </button>
        <button onClick={() => setOffset(offset + 20)}>
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 192 512" className="h-10 w-10 cursor-pointer text-black dark:text-white" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path>
            </svg>
        </button>
        </div>
    </Layout>
  )
}

export default Home
