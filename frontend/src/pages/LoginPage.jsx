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
    <main>
      <h1>Iniciar sesión</h1>

      <form onSubmit={handleSubmit}>
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

        {error && <p>{error}</p>}

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </button>
      </form>

      <p>
        ¿No tenés una cuenta? <Link to="/register">Registrate</Link>
      </p>
    </main>
  )
}

export default LoginPage