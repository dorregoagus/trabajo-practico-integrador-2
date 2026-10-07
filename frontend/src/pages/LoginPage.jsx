import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import useForm from '../hooks/useForm'

function LoginPage() {
    const { form, handleInputChange, handleReset } = useForm({
        email: '',
        password: '',
    })

    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()

        setError('')
        setIsLoading(true)

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(form),
            })

            const data = await response.json()

            if (!response.ok) {
                setError(data.message || 'Credenciales inválidas')
                return
            }

            localStorage.setItem('isLogged', 'true')
            handleReset()
            navigate('/')
        } catch (error) {
            setError('No se pudo conectar con el servidor')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <main className="min-h-screen bg-gray-100 px-6 py-10">
            <section className="mx-auto max-w-md rounded-xl bg-white p-8 shadow-md">
                <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
                    Iniciar sesión
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleInputChange}
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Contraseña
                        </label>

                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleInputChange}
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
                        />
                    </div>

                    {error && (
                        <p className="rounded-lg bg-red-100 p-3 text-sm text-red-700">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    ¿No tenés una cuenta?{' '}
                    <Link
                        to="/register"
                        className="font-medium text-blue-600 hover:underline"
                    >
                        Registrate
                    </Link>
                </p>
            </section>
        </main>
    )
}

export default LoginPage