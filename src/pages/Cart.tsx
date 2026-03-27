import { useMemo, useState } from 'react';
import { guitarsDb } from '../data/guitars';

type GuitarsType = {
    id: number,
    name: string,
    image: string,
    description: string,
    price: number,
    quantity: number
}

export default function Cart() {

    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart');

        return localStorageCart ? JSON.parse(localStorageCart) : [];
    };

    const [db] = useState<GuitarsType[]>(guitarsDb);
    const [cart, setCart] = useState<GuitarsType[]>(initialCart);

    const isEmpty = useMemo(() => cart.length === 0 , [cart]);
    const MAX_ITEMS = 5;
    const MIN_ITEMS = 1;

    const addItem = (item: GuitarsType) => {
        
        const itemExist = cart.findIndex(guitar => guitar.id === item.id);

        if(itemExist >= 0){
            if(cart[itemExist].quantity >= MAX_ITEMS) return;

            const updateCart = [...cart];
            updateCart[itemExist].quantity++;
            setCart(updateCart);
        }else{
            item.quantity = 1;
            setCart((prev) => [...prev, item])
        }
    };

    return (
        <>
            <header className="bg-gray-900 p-6 md:p-8 shadow-xl">
                <div className='container mx-auto flex justify-between items-center'>
                    <h1 className='text-3xl font-black text-white tracking-tighter'>
                        Guitar <span className='text-yellow-500'>LA</span>
                    </h1>

                    <div className='relative group bg-white/10 hover:bg-white/20 p-3 rounded-xl cursor-pointer transition-all group'>

                        {/* Elemento para disparar el hover  */}
                        <svg className="w-7 h-7 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"/>
                        </svg>
                        <span className='absolute -top-1 -right-1 bg-yellow-500 text-black text-xs font-bold px-1.5 rounded-full'>{cart.length}</span>

                        {/* Modal Flotante */}
                        <div className='absolute right-0 top-full mt-2 w-96 bg-white p-5 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all border-border-gray z-50'>
                            {
                            isEmpty? (
                                <p className='text-center text-gray-500 py-4'>The Cart is empty</p>
                            ) : (
                                <div className=''>
                                    <table className=''>
                                        <thead className=''>
                                            <tr>Imagen</tr>
                                            <tr>Nombre</tr>
                                            <tr>Precio</tr>
                                            <tr>Cantidad</tr>
                                        </thead>

                                        <tbody className='max-w-dvw'>
                                            {
                                                cart.map(guitar => (
                                                    <tr key={guitar.id} className=' '>
                                                        <td>
                                                            <img className='w-8 ' src={`/img/${guitar.image}.jpg`} alt="guitar img" />
                                                        </td>
                                                        <td>{guitar.name}</td>
                                                        <td>{guitar.price}</td>
                                                        <td>{guitar.quantity}</td>  
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            ) 
                        }
                        </div>
                    </div>

                </div>
            </header>

            <main className="container mx-auto mt-10 px-4 pb-20 overflow-hidden">
                
                <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">Colección</h2>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 over overflow-x-auto'>
                    {db.map ((guitar)=> (
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
                                className='w-full bg-gray-800 hover:bg-black text-white font-bold uppercase py-3 rounded-lg transition-colors hover:scale-95'
                                onClick={() => addItem(guitar)}
                                >
                                    Add
                            </button>
                            </div>
                            
                        </div>
                    ))}
                </div>
            </main>
        </>
    )
}
