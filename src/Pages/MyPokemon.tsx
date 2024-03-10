import Layout from "@/components/Layout"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter} from "@/components/ui/card";
import { useState, useEffect } from "react"

const MyPokemon = () => {
  const [mypokemon,setMypokemon] = useState([])
  useEffect(() => {
    const getFromLocal = JSON.parse(localStorage.getItem("myPokemons") || "[]");
    setMypokemon(getFromLocal);
  }, []);
  console.log(mypokemon)
  return (
    <Layout>
        <div className="grid grid-cols-2">
            {mypokemon.map((item,index) => (
                <Card key={index}>
                    <div className="text-right p-3">
                        <Button className="bg-red-500 hover:bg-red-800">X</Button>
                    </div>
                    <CardContent>
                        <CardDescription>
                            <img src={item.sprites} alt="" />
                        </CardDescription>
                        <CardFooter>
                            <p className="text-xl text-center capitalize">{item.name} ({item.alias})</p>
                        </CardFooter>
                    </CardContent>
                </Card>
            ))}
        </div>
    </Layout>
  )
}

export default MyPokemon
