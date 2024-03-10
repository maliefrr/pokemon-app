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
  const fetchData = async () => {
    try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon")
        setPokemon(response.data)
    } catch (error) {
        console.log((error as Error).message)
    }
  }
  useEffect(() => {
    fetchData()
  },[])
  console.log(pokemon)
  return (
    <Layout>
      <div className="grid gird-cols-2">
        {pokemon?.results.map((item) => (
            <Card>
                <CardContent>
                    <img src={item.url} alt={item.name} />
                    <p>{item.name}</p>
                </CardContent>
            </Card>
        ))}
      </div>
    </Layout>
  )
}

export default Home
