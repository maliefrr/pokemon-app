import { useParams } from "react-router-dom"

const PokemonDetail = () => {
    const params = useParams()
  return (
    <div>
      <p className='text-2xl'>{params.pokemon}</p>
    </div>
  )
}

export default PokemonDetail
