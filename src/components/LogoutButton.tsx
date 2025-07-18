import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

interface LogoutButtonProps {
  className?: string
  children?: React.ReactNode
}

/**
 * Componente de botão para logout
 * Exemplo de uso prático do sistema de autenticação
 */
export function LogoutButton({ className, children }: LogoutButtonProps) {
  const [loading, setLoading] = useState(false)
  const { signOut } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    setLoading(true)
    
    try {
      const result = await signOut()
      
      if (result.success) {
        // Redireciona para a página de login após logout
        navigate('/login', { replace: true })
      } else {
        // Mesmo com erro, tenta redirecionar (pode ser problema de rede)
        navigate('/login', { replace: true })
      }
    } catch (error) {
      navigate('/login', { replace: true })
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed ${className || ''}`}
    >
      {loading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          Saindo...
        </>
      ) : (
        children || 'Sair'
      )}
    </button>
  )
}
