import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import useForm from '../hooks/useForm'

function RegisterPage() {
    const { form, handleInputChange, handleReset } = useForm({
        username: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
    })

    const [errors, setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()

        setErrors([])
        setIsLoading(true)

        try {
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(form),
            })

            const data = await response.json()

            if (!response.ok) {
                if (Array.isArray(data.errors)) {
                    setErrors(data.errors)
                } else {
                    setErrors([data.message || 'No se pudo crear la cuenta'])
                }

                return
            }

            handleReset()
            navigate('/login')
        } catch (error) {
            setErrors(['No se pudo conectar con el servidor'])
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <main className="min-h-screen bg-gray-100 px-6 py-10">
            <section className="mx-auto max-w-md rounded-xl bg-white p-8 shadow-md">
                <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
                    Crear cuenta
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label
                            htmlFor="username"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Usuario
                        </label>

                        <input
                            id="username"
                            name="username"
                            type="text"
                            value={form.username}
                            onChange={handleInputChange}
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
                        />
                    </div>

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

                    <div>
                        <label
                            htmlFor="firstName"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Nombre
                        </label>

                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            value={form.firstName}
                            onChange={handleInputChange}
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="lastName"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Apellido
                        </label>

                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            value={form.lastName}
                            onChange={handleInputChange}
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
                        />
                    </div>

                    {errors.length > 0 && (
                        <div className="rounded-lg bg-red-100 p-3 text-sm text-red-700">
                            {errors.map((error, index) => (
                                <p key={index}>{error.msg || error}</p>
                            ))}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isLoading ? 'Creando cuenta...' : 'Registrarse'}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    ¿Ya tenés una cuenta?{' '}
                    <Link
                        to="/login"
                        className="font-medium text-blue-600 hover:underline"
                    >
                        Iniciá sesión
                    </Link>
                </p>
            </section>
        </main>
    )
}

export default RegisterPage