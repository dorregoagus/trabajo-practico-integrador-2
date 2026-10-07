import { Link } from 'react-router'

function Navbar() {
    return (
        <nav>
            <Link to="/">Inicio</Link>

            <button type="button">
                Cerrar sesión
            </button>
        </nav>
    )
}

export default Navbar