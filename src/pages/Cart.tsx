import { useEffect, useMemo, useState } from 'react';
import { guitarsDb } from '../data/guitars';
import { euro } from '../helpers/index';

type GuitarsType = {
    id: number,
    name: string,
    image: string,
    description: string,
    price: number,
    quantity: number
}

export default function Cart() {

    const MAX_ITEMS = 5;
    const MIN_ITEMS = 1;

    const getInitialCart = (): GuitarsType[]=> {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    };

    const [db] = useState<GuitarsType[]>(guitarsDb);
    const [cart, setCart] = useState<GuitarsType[]>(getInitialCart);

    const isCartEmpty = useMemo(() => cart.length === 0 , [cart]);
    const total = useMemo(() => cart.reduce ((total, item) => total + (item.quantity * item.price), 0), [cart])

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    const addItem = (item: GuitarsType) => {
        setCart(prev => {
            const itemIndex = prev.findIndex(guitar => guitar.id === item.id);

            // Bloque que ocurre si el id ya existe actualmente en el carrito
            if(itemIndex >= 0){
                if(prev[itemIndex].quantity >= MAX_ITEMS) return prev;

                const updateCart = [...prev];
                updateCart[itemIndex] = {
                    ...updateCart[itemIndex],
                    quantity: updateCart[itemIndex].quantity + 1
                }
                return updateCart;
            };

            // Bloque que existe si el id todavia no existe en el carrito
            return[...prev, {... item, quantity: 1}];
        })
    };

    const updateQuantity = (id:number, delta: number) => {
        setCart(prev => 
            prev.map(item => {
                if(item.id !== id) return item; 

                const newQuantity = item.quantity + delta;

                if(newQuantity > MAX_ITEMS || newQuantity < MIN_ITEMS){
                    return item;
                }


                return{
                    ...item,
                    quantity:newQuantity
                }
            })
        )
    }

    const deleteElement = (id: number) => {
        setCart(prev => prev.filter(guitar => guitar.id !== id))
    }

    const clearCart = () => {
        setCart([]);
    }

    return (
        // El div padre, toma toda la altura de la pantalla y se le aplica un layout vertical para que ningun elemento dentro, se salga de la pantalla (evitar un scroll en vertical que se desacople del sidebar)
        <div className='h-screen flex flex-col'> 
            <header className="bg-gray-900 p-6 md:p-8 shadow-xl">
                <div className='container mx-auto flex justify-between items-center'>
                    <h1 className='text-3xl font-black text-white tracking-tighter'>
                        Guitar <span className='text-yellow-500'>LA</span>
                    </h1>

                    <div className='relative group bg-white/10 hover:bg-white/20 p-3 rounded-xl cursor-pointer transition-all'>
                        {/* Elemento para disparar el hover  */}
                        <svg className="w-7 h-7 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"/>
                        </svg>
                        <span className='absolute -top-1 -right-1 bg-yellow-500 text-black text-xs font-bold px-1.5 rounded-full'>{cart.length}</span>

                        {/* Modal Flotante */}
                        <div className='absolute right-0 top-full mt-2 w-96 bg-white p-4 rounded-xl shadow-2xl opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all border border-gray-100 z-50'>
                            {
                            isCartEmpty? (
                                <p className='text-center text-gray-500 py-4'>The Cart is empty</p>
                            ) : (
                                <div className='w-full max-h-[60vh] overflow-y-auto'>
                                    <table className='w-xs text-sm text-left text-gray-500 table-fixed'>
                                        <thead className='text-[10px] text-gray-400 uppercase border-b border-gray-100'>
                                            <tr>
                                                <th scope='col' className='px-6 py-2'>Imagen</th>
                                                <th scope='col' className='px-6 py-2'>Nombre</th>
                                                <th scope='col' className='px-6 py-2'>Precio</th>
                                                <th scope='col' className='px-6 py-2'>Cantidad</th>
                                            </tr>
                                        </thead>

                                        <tbody className='divide-y divide-gray-200'>
                                            {cart.map(guitar => (
                                                <tr key={guitar.id}>
                                                    <td className='px-6 py-2'>
                                                        <img className='w-12 h-auto' src={`/img/${guitar.image}.jpg`} alt={`Image ${guitar.name}`} />
                                                    </td>
                                                    <td className='px-6 py-2 font-medium text-gray-900'>{guitar.name}</td>
                                                    <td className='px-6 py-2'>${guitar.price}</td>
                                                    <td className='px-6 py-2'>
                                                        <div className='flex items-center justify-between gap-2'>
                                                            <button onClick={() => updateQuantity(guitar.id, -1)} className='w-6 h-6 rounded-full bg-gray-100 p-2 flex items-center cursor-pointer hover:bg-red-400 hover:text-white transition-colors active:scale-95'> - </button>
                                                            <span className='font-black text-gray-800 text-center'> {guitar.quantity} </span>
                                                            <button onClick={() => updateQuantity(guitar.id, 1)} className='w-6 h-6 rounded-full bg-gray-100 p-2 flex items-center cursor-pointer hover:bg-green-400 hover:text-white transition-colors active:scale-95 '> + </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className='flex justify-between px-4 font-semibold text-right'>
                                        <button onClick={() => clearCart()} className='bg-red-400 py-1 px-2 text-white rounded-lg scale-90 hover:scale-100 transition-all'>
                                            Limpiar carrito
                                        </button>
                                        <span className='text-gray-500'>Euro: {euro.format(total)} </span>
                                    </div>
                                </div>
                            ) 
                        }
                        </div>
                    </div>

                </div>
            </header>

            <main className="container mx-auto mt-10 px-4 pb-20 overflow-y-auto">
                
                <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">Colección</h2>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {db.map ((guitar) => (
                        <div key={guitar.id} 
                            className='flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 group'
                        >
                            <div className='w-1/3'>
                                <img 
                                    className='w-full h-auto transform -rotate-6 group-hover:rotate-0 transition-transform' 
                                    src={`/img/${guitar.image}.jpg`} 
                                    alt={`Imagen de ${guitar.name}`}
                                />
                            </div>
                            <div className='w-2/3 space-y-3'>
                                <h3 className='text-2xl font-black uppercase text-gray-900'>{guitar.name}</h3>
                                <p className='text-gray-600 leading-snug line-clamp-3 text-sm'>{guitar.description}</p>
                                <p className='text-3xl font-black text-yellow-500'>${guitar.price}</p>
                                <button
                                    type='button'
                                    className='w-full bg-gray-800 hover:bg-black text-white font-bold uppercase py-3 rounded-lg transition-colors active:scale-95 hover:scale-105'
                                    onClick={() => addItem(guitar)}
                                    >
                                        Add
                                </button>
                            </div>
                            
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}
