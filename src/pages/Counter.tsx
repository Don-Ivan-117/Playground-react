import { useState } from "react"

export default function Counter() {

    const [count, setCount] = useState(0)

    // const increment = () => setCount(prev => prev + 1);
    // const decrement = () => setCount(prev => Math.max(prev -1, 0));

    //delta =  cambio a aplicar al contador
    //Math.max(prev + delta, 0): asegura que el contador nunca baje de 0. 
    //- Si prev + delta es mayor o igual a 0, se usa ese valor.
    // Si es menor que 0, se fuerza a 0.
    const updateCount = (delta: number) => {
        setCount(prev => Math.max(prev + delta, 0))
    }

    return (
        <div className="bg-gray-100 h-screen flex justify-center items-center">
            <div className="space-x-6 flex items-center">

                <button
                onClick={() => updateCount(-1)}
                disabled={count === 0}
                className="bg-white hover:bg-red-400 active:scale-95 transition-all w-12 h-12 rounded-lg shadow-lg flex items-center justify-center"
                >
                -
                </button>

                <span className={`text-6xl font-bold ${count === 0? 'animate-pulse' : ''} `}>
                    {count}
                </span>

                <button
                onClick={() => updateCount(1)}
                
                className="bg-white hover:bg-green-400 active:scale-95 transition-all w-12 h-12 rounded-lg shadow-lg flex items-center justify-center"
                >
                +
                </button>
            </div>
        </div>
    )
}