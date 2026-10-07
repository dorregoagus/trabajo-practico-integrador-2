import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import Navbar from '../components/Navbar'
import PrivateRoutes from './PrivateRoutes'
import PublicRoutes from './PublicRoutes'

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PrivateRoutes />}>
                    <Route
                        path="/"
                        element={
                            <>
                                <Navbar />
                                <HomePage />
                            </>
                        }
                    />
                </Route>

                <Route element={<PublicRoutes />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Route>

                <Route
                    path="*"
                    element={
                        localStorage.getItem('isLogged') === 'true' ? (
                            <Navigate to="/" replace />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter