import { useEffect, useState, useMemo } from "react";

type PokemonType = {
    name: string,
    url: string
}

const pokeBaseUrl= 'https://pokeapi.co/api/v2/pokemon/';
const offset = 251;
const limit = 135;

const pokeUrl = `${pokeBaseUrl}?limit=${limit}&offset=${offset}`

export default function Filter() {

    const [searchPoke, setSearchPoke] = useState('')
    const [pokemons, setPokemons] = useState<PokemonType[]>([]);
    const [loading, setLoading] =  useState(true);
    const isSearching = searchPoke.trim() !== ''

    useEffect(()=>{
        fetch(pokeUrl).
            then(response => { return response.json()})
            .then(result => {
                setPokemons(result.results)
                setLoading(false)
            })
            .catch(error => {
                console.log('Error', error);
                setLoading(false)
            });
    },[]);

    // Memo, para evitar re-cálculos (guarda el resultada para evitar un re-render y solo vuelve a calcular si searchPoke o pokemons cambian)
    /** Nota: tenemos pokemons, como depencia de useMemo junto con searchPoke, porque react funciona capturando los valores en cada renderizado.
     *  En este caso, el calculo se hace cada vez que el usuario escribe algo si, pero buscando en el arreglo de pokemons, en un primer momento al iniciar el proyecto el arreglo de pokemons
     * se encuentra vacio, entonces, es necesario decirle que una vez que se hizo fetch a la API de pokemos y ya se guardaron los valores, entonces vuelva a hacer el 
     * calculo y el filtro, ahora con los pokemones que obtuvimos de la API y no con el arreglo vacio que teniamos al iniciar el proyecto.
     */
    const filteredPokemons = useMemo(() => {
        return pokemons.filter(pokemon => 
            pokemon.name.toLowerCase().includes(searchPoke.toLowerCase())
        );
    }, [searchPoke, pokemons]);

    /**
     * Nota: Como usabamos items-center en lugar de pt-20, con cada elemento en la lista de resultados se deformaba todo debido a que intentaba centrar todos los elementos.
     * Por ese es mejor usar una distancia definida como pt-20 en este caso, donde independientemente de la lista de resultados todo va a estar 80px hacia abajo de la parte superior
     */

    return (
        //usamos pt-20 en lugar de items-center para una distancia especifica desde la parte superior
        <div className="min-h-screen bg-gray-100 flex justify-center pt-20 p-4">
            {/* Usamos h-fit para que el contenedor no se estire innecesariamente */}
            <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg h-fit">
                <h1 className="text-3xl font-bold text-center text-yellow-500 mb-6">Poke Search (3G)</h1>

                <div className="relative mb-4">
                <input 
                    id='pokemon'
                    name='pokemon'
                    type="text" 
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition-all"
                    placeholder="Busca tu Pokémon (ej. Kyogre)..."
                    value={searchPoke}
                    onChange={(e) => setSearchPoke(e.target.value)}
                />
                </div>

                {/* Ocultamos el scroll por defecto */}
                <div className="overflow-hidden">
                    {/* Establecemos una altura maxima de 320px para el contenedor de resultados y agremos un scroll cuando la cantidad de resultados supere ese limite de altura*/}
                    <ul className="max-h-80 overflow-y-auto">
                        {loading && <p className="text-center text-gray-400">Cargando Pokédex...</p>}
                        
                        {isSearching && filteredPokemons.length > 0 ? (
                            filteredPokemons.map((pokemon) => (
                                <li 
                                key={pokemon.name} 
                                className="flex items-center px-4 py-3 hover:bg-yellow-50 rounded-lg cursor-pointer transition-colors border-b border-gray-50 last:border-none group"
                                >
                                <span className="capitalize text-gray-700 group-hover:text-yellow-600 font-medium">
                                    {pokemon.name}
                                </span>
                                </li>
                            ))
                        ) : isSearching && !loading ? (
                            <p className="text-center text-gray-400 py-4">No se encontraron resultados</p>
                        ) : null}
                    </ul>
                </div>
            </div>
        </div>
    );
}
