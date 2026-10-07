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
        <main>
            <h1>Crear cuenta</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Usuario</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        value={form.username}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="firstName">Nombre</label>
                    <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={form.firstName}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="lastName">Apellido</label>
                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={form.lastName}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {errors.length > 0 && (
                    <div>
                        {errors.map((error, index) => (
                            <p key={index}>{error.msg || error}</p>
                        ))}
                    </div>
                )}

                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Creando cuenta...' : 'Registrarse'}
                </button>
            </form>

            <p>
                ¿Ya tenés una cuenta? <Link to="/login">Iniciá sesión</Link>
            </p>
        </main>
    )
}

export default RegisterPage