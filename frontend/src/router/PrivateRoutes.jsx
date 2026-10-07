import { Navigate, Outlet } from 'react-router'

function PrivateRoutes() {
    const isLogged = localStorage.getItem('isLogged') === 'true'

    if (!isLogged) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}

export default PrivateRoutes