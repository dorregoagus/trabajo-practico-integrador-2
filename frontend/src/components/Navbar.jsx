import { Link } from 'react-router'

function Navbar() {
    return (
        <nav className="flex items-center justify-between bg-gray-800 px-6 py-4 text-white">
            <Link
                to="/"
                className="text-xl font-bold hover:text-gray-300"
            >
                Mi aplicación
            </Link>

            <button
                type="button"
                className="rounded-lg bg-red-500 px-4 py-2 font-medium hover:bg-red-600"
            >
                Cerrar sesión
            </button>
        </nav>
    )
}

export default Navbar