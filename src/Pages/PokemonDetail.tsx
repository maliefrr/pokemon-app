import Layout from "@/components/Layout"
import { Card, CardContent } from "@/components/ui/card"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const PokemonDetail = () => {
    const params = useParams()
    const [data,setData] = useState()
    const [sprites,setSprites] = useState("")
    
    const fetchData = async () => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${params.pokemon}`)
            setData(response.data)
            setSprites(response.data.sprites.other.dream_world.front_default)
        } catch (error) {
            console.log((error as Error).message)
        }
    }
    useEffect(() => {
        fetchData()
    },[])
  return (
    <Layout>
      <Card>
        <CardContent>
            <div>
                <img src={sprites} alt="" width={140} />
                <div>
                    <p>Types</p>
                       
                </div>
            </div>
        </CardContent>
      </Card>
    </Layout>
  )
}

export default PokemonDetail
