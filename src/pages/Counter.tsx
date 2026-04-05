import { useState, useEffect } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState<number[]>([]);

  const updateCount = (delta: number) => {
    setCount(prev => {
      const newValue = Math.max(prev + delta, 0);

      // guardamos el valor anterior en el historial
      if (prev !== newValue) {
        setHistory(h => [...h, prev]);
      }

      return newValue;
    });
  };

  const reset = () => {
    setHistory(h => [...h, count]);
    setCount(0);
  };

  const noAction = history.length === 0;
  
  useEffect(() => {
    const handleKeyDown = (event) => {
        if(event.key === "ArrowRight"){
            updateCount(1)
            console.log('+1')
        };
        if(event.key === "ArrowLeft"){
            updateCount(-1)
            console.log('-1')
        };
        
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="w-96 p-8 space-y-6 border rounded-xl shadow-md bg-white">

        {/* Contador */}
        <div className="flex items-center justify-center space-x-6">
          <button
            onClick={(e) => updateCount(-1)}
            disabled={count === 0}
            className="bg-white hover:bg-red-400 active:scale-95 transition-all w-12 h-12 rounded-lg shadow flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            -
          </button>

          <span
            className={`text-6xl font-bold transition-all duration-200 ${
              count === 0 ? "animate-pulse" : "scale-110"
            }`}
          >
            {count}
          </span>

          <button
            onClick={() => updateCount(1)}
            className="bg-white hover:bg-green-400 active:scale-95 transition-all w-12 h-12 rounded-lg shadow flex items-center justify-center"
          >
            +
          </button>
        </div>

        {/* Acciones */}
        <div className="flex justify-center">
          <button
            onClick={reset}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
          >
            Reset
          </button>
        </div>

        {/* Historial */}
        <div className="max-h-40 overflow-y-auto border-t pt-4">
          {noAction ? (
            <p className="text-sm text-gray-400 text-center">
              Make a sum or a rest
            </p>
          ) : (
            <ul className="space-y-1 text-sm">
              {history.map((value, index) => (
                <li key={index} className="text-gray-600">
                  Prev: {value}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}