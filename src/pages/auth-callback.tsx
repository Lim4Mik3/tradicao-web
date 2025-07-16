import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/infra/supabase'

export function AuthCallback() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    handleAuthCallback()
  }, [])

  const handleAuthCallback = async () => {
    try {
      // Verifica se há um hash na URL (usado pelo Supabase para confirmação de email)
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        console.error('Erro no callback de autenticação:', error.message)
        setError(`Erro na autenticação: ${error.message}`)
        setLoading(false)
        return
      }

      if (data.session) {
        // Sucesso - usuário autenticado
        console.log('Usuário autenticado com sucesso:', data.session.user?.email)
        
        // Armazena informações da sessão no localStorage (opcional)
        localStorage.setItem('supabase_session', JSON.stringify(data.session))
        localStorage.setItem('user', JSON.stringify(data.session.user))

        // Redireciona para o dashboard ou página protegida
        navigate('/dashboard', { replace: true })
      } else {
        // Não há sessão ativa
        console.log('Nenhuma sessão ativa encontrada')
        setError('Falha na autenticação. Tente fazer login novamente.')
        
        // Redireciona para login após alguns segundos
        setTimeout(() => {
          navigate('/login', { replace: true })
        }, 3000)
      }
    } catch (unexpectedError) {
      console.error('Erro inesperado no callback:', unexpectedError)
      setError('Erro inesperado durante a autenticação')
    } finally {
      setLoading(false)
    }
  }

  const handleRetryLogin = () => {
    navigate('/login', { replace: true })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Processando autenticação...
          </h2>
          <p className="text-gray-600">
            Aguarde enquanto verificamos suas credenciais.
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Falha na Autenticação
          </h2>
          
          <p className="text-gray-600 mb-6">
            {error}
          </p>
          
          <button
            onClick={handleRetryLogin}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    )
  }

  // Este retorno normalmente não será exibido, pois o usuário será redirecionado
  return null
}
