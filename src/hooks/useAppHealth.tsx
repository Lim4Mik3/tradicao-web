import { useEffect, useState } from 'react';
import { supabase } from '@/infra/supabase';

interface HealthCheck {
  supabase: boolean;
  localStorage: boolean;
  environment: boolean;
  errors: string[];
}

/**
 * Hook para verificar a saúde da aplicação
 */
export function useAppHealth() {
  const [health, setHealth] = useState<HealthCheck>({
    supabase: false,
    localStorage: false,
    environment: false,
    errors: []
  });

  useEffect(() => {
    checkHealth();
  }, []);

  const checkHealth = async () => {
    const errors: string[] = [];
    let supabaseOk = false;
    let localStorageOk = false;
    let environmentOk = false;

    // Verifica localStorage
    try {
      localStorage.setItem('health-check', 'test');
      localStorage.removeItem('health-check');
      localStorageOk = true;
    } catch (error) {
      errors.push('LocalStorage não está disponível');
    }

    // Verifica variáveis de ambiente
    try {
      if (!import.meta.env.VITE_SUPABASE_URL) {
        errors.push('VITE_SUPABASE_URL não configurada');
      }
      if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
        errors.push('VITE_SUPABASE_ANON_KEY não configurada');
      }
      if (import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY) {
        environmentOk = true;
      }
    } catch (error) {
      errors.push('Erro ao verificar variáveis de ambiente');
    }

    // Verifica conexão com Supabase
    try {
      const { error } = await supabase.auth.getSession();
      if (!error) {
        supabaseOk = true;
      } else {
        errors.push(`Erro Supabase: ${error.message}`);
      }
    } catch (error) {
      errors.push('Não foi possível conectar ao Supabase');
    }

    setHealth({
      supabase: supabaseOk,
      localStorage: localStorageOk,
      environment: environmentOk,
      errors
    });
  };

  return { health, checkHealth };
}
