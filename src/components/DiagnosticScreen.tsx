import { useAppHealth } from '@/hooks/useAppHealth';
import { clearAuthData } from '@/utils/authUtils';

export function DiagnosticScreen() {
  const { health, checkHealth } = useAppHealth();

  const handleClearData = () => {
    clearAuthData();
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/login';
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleRecheck = () => {
    checkHealth();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">🔧</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Diagnóstico do Sistema
          </h1>
          <p className="text-gray-600">
            Verificando o status dos componentes da aplicação
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="font-medium">Supabase</span>
            <span className={health.supabase ? 'text-green-600' : 'text-red-600'}>
              {health.supabase ? '✅ Conectado' : '❌ Erro'}
            </span>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="font-medium">LocalStorage</span>
            <span className={health.localStorage ? 'text-green-600' : 'text-red-600'}>
              {health.localStorage ? '✅ Funcionando' : '❌ Erro'}
            </span>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="font-medium">Variáveis de Ambiente</span>
            <span className={health.environment ? 'text-green-600' : 'text-red-600'}>
              {health.environment ? '✅ Configuradas' : '❌ Erro'}
            </span>
          </div>
        </div>

        {health.errors.length > 0 && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <h3 className="font-semibold text-red-800 mb-2">Erros Detectados:</h3>
            <ul className="text-sm text-red-700 space-y-1">
              {health.errors.map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-3">
          <button
            onClick={handleRecheck}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Verificar Novamente
          </button>
          
          <button
            onClick={handleRefresh}
            className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Recarregar Página
          </button>
          
          <button
            onClick={handleClearData}
            className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Limpar Dados
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Se o problema persistir, entre em contato com o suporte técnico.</p>
        </div>
      </div>
    </div>
  );
}
