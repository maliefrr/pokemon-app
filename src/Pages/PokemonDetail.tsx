import Layout from "@/components/Layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Modal from "@/components/Modal";



const COLOR_TYPE: { [key: string]: string } = {
    normal: "bg-transparent",
    fighting: "bg-blue-900",
    flying: "bg-emerald-300",
    poison: "bg-lime-600",
    ground: "bg-yellow-800",
    rock: "bg-stone-700",
    bug: "bg-stone-400",
    ghost: "bg-stone-500",
    steel: "bg-slate-500",
    fire: "bg-orange-600",
    water: "bg-blue-200",
    grass: "bg-emerald-800",
    electric: "bg-yellow-200",
    psychic: "bg-teal-200",
    ice: "bg-blue-400",
    dragon: "bg-red-900",
    dark: "bg-black",
    fairy: "bg-rose-500",
    unknown: "bg-stone-800",
    shadow: "bg-neutral-600",
  };

const PokemonDetail = () => {
    const params = useParams()
    const [sprites,setSprites] = useState("")
    const [types,setTypes] = useState([])
    const [stats,setStats] = useState([])
    const [name,setName] = useState("")
    const [weight,setWeight] = useState("")
    const [height,setHeight] = useState("")
    const [abilities,setAbilities] = useState([])
    const [moves,setMoves] = useState([])
    const [showModal,setShowModal] = useState(false)
    const [alias,setAlias] = useState("")

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${params.pokemon}`)
            setTypes(response.data.types)
            setSprites(response.data.sprites.other.dream_world.front_default)
            setStats(response.data.stats)
            setName(response.data.name)
            setHeight(response.data.height)
            setWeight(response.data.weight)
            setAbilities(response.data.abilities)
            setMoves(response.data.moves.slice(0,5))
        } catch (error) {
            console.log((error as Error).message)
        }
    }

    const handleCatch = () => {
        const chance = Math.random() * 100;
        if (chance > 50) {
          setShowModal(true);
        } else {
          alert("You missed!");
        }
      };
      const submitMyPokemon = () => {
        const getFromLocal = JSON.parse(localStorage.getItem("myPokemons") || "[]");
        const findIfExist = getFromLocal.find(
          (x) => x.alias == alias
        );
        if (findIfExist) {
          alert(`Alias ${alias} is already exist!`);
        } else {
          const myPokemon = Object.assign({}, {
            name,
            alias,
            sprites
          });
          getFromLocal.push(myPokemon);
          localStorage.setItem("myPokemons", JSON.stringify(getFromLocal));
          setAlias("")
          setShowModal(false)
        }
      };

    useEffect(() => {
        fetchData()
    },[])

  return (
    <Layout>
      <div className="grid grid-cols-2 gap-4">
        <Card>
            <CardContent>
                <div>
                    <img src={sprites} alt="" width={140} />
                    <div className="grid grid-flow-row auto-rows-max grid-cols-2 gap-4 mt-5">
                    {types.map((item) => (
                        <p className={`overflow-hidden break-all rounded-full border border-black p-2 text-center text-xs capitalize tracking-wide ${COLOR_TYPE[item.type.name]}`}>{item.type.name}</p>
                    ))}
                    </div>
                </div>
            </CardContent>
        </Card>
        <Card>
            <CardContent>
                {stats.map((item,index) => (
                    <div className="mb-2" key={index}>
                        <p className="capitalize">{item.stat.name}</p>
                        <Progress value={item.base_stat}/>
                        <p>{item.base_stat}</p>
                    </div>
                ))}
            </CardContent>
        </Card>
      </div>
      <Card className="mt-3 p-3">
        <CardContent>
            <p>Name : <span className="capitalize">{name}</span></p>
            <p>Height : <span className="capitalize">{height}</span></p>
            <p>Weight : <span className="capitalize">{weight}</span></p>    
        </CardContent>
      </Card>
      <div className="grid grid-cols-2 mt-3 gap-4 mb-3">
        <Card className="p-3">
            <CardContent>
                <ul className="ml-3 list-outside list-disc">
                    {abilities.map((item) => {
                        return (
                            !item.is_hidden && (
                                <li key={item.slot} className="overflow-hidden break-all capitalize tracking-wide text-black">{item.ability.name}</li>
                            )
                        )
                    }  
                    )}
                </ul>
            </CardContent>
        </Card>
        <Card className="p-3">
            <CardContent>
                <ul className="ml-3 list-outside list-disc">
                    {moves.map((item,index) => (
                        <li key={index} className="overflow-hidden break-all capitalize tracking-wide text-black">{item.move.name}</li>
                    ))}
                </ul>
            </CardContent>
        </Card>
      </div>
      <div className="flex justify-center">
        <Button onClick={() => handleCatch()}>Catch</Button>
      </div>
      <Modal show={showModal}>
        <div className="mb-5">
          <p className="text-center text-xs font-bold tracking-wide text-neutral-800 dark:text-white">
            Congratulation!
          </p>
          <p className="text-center text-xs font-bold tracking-wide text-neutral-800 dark:text-white">
            You caught {name}
          </p>
        </div>
        <div className="flex flex-col items-center">
          <label className="block">
            <span className="block text-sm font-medium text-neutral-800 dark:text-white">
              Nickname
            </span>
            <input
              className="block w-full rounded-md border border-slate-300 bg-white py-2 px-3 text-xs shadow-sm placeholder:italic focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
              type="text"
              onChange={(e) => setAlias(e.target.value)}
            />
          </label>
          <button
            className="mt-4 rounded-xl border p-3 text-center text-xs tracking-wide text-neutral-800 dark:text-white"
            onClick={() => submitMyPokemon()}
          >
            Submit
          </button>
        </div>
      </Modal>
    </Layout>
  )
}

export default PokemonDetail
