import { useNavigate } from 'react-router'

function Navbar() {
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
            })

            if (response.ok) {
                localStorage.removeItem('isLogged')
                navigate('/login')
            }
        } catch (error) {
            console.error('Error al cerrar sesión:', error)
        }
    }

    return (
        <nav className="flex items-center justify-between bg-gray-800 px-6 py-4 text-white">
            <button
                type="button"
                onClick={() => navigate('/')}
                className="text-xl font-bold hover:text-gray-300"
            >
                Mi aplicación
            </button>

            <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg bg-red-500 px-4 py-2 font-medium hover:bg-red-600"
            >
                Cerrar sesión
            </button>
        </nav>
    )
}

export default Navbar