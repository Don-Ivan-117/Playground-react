import { Link } from 'react-router-dom'

export default function Menu() {
    return (
        <>
            <aside className="h-screen w-64 bg-gray-900 text-white flex flex-col p-6">
                <h1 className="text-2xl font-bold mb-8">
                    Playground
                </h1>

                <nav className="flex flex-col gap-4">
                    <Link to="/" className="hover:bg-gray-700 p-2 rounded transition">
                        Home
                    </Link>

                    <Link to="/counter" className="hover:bg-gray-700 p-2 rounded transition">
                        Counter
                    </Link>

                    <Link to="/todo" className="hover:bg-gray-700 p-2 rounded transition">
                        To Do
                    </Link>

                    <Link to="/filter" className="hover:bg-gray-700 p-2 rounded transition">
                        Filter
                    </Link>

                    <Link to="/cart" className="hover:bg-gray-700 p-2 rounded transition">
                        Cart
                    </Link>
                </nav>
            </aside>
        </>
    )
}
