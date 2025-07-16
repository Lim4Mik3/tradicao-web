import { supabase } from '@/infra/supabase'

export namespace AuthService {
  export type SignUpInput = {
    email: string
    password: string
  }

  export type SignInInput = {
    email: string
    password: string
  }

  export type AuthResponse = {
    success: boolean
    user?: any
    session?: any
    error?: string
  }
}

/**
 * Cadastra um novo usuário no Supabase
 */
export async function signUp(props: AuthService.SignUpInput): Promise<AuthService.AuthResponse> {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: props.email,
      password: props.password,
    })

    if (error) {
      console.error('Erro ao cadastrar usuário:', error.message)
      return {
        success: false,
        error: error.message,
      }
    }

    // Usuário criado com sucesso
    console.log('Usuário cadastrado com sucesso:', data.user?.email)
    
    return {
      success: true,
      user: data.user,
      session: data.session,
    }
  } catch (error) {
    console.error('Erro inesperado ao cadastrar:', error)
    return {
      success: false,
      error: 'Erro inesperado ao cadastrar usuário',
    }
  }
}

/**
 * Faz login com email e senha
 */
export async function signInWithPassword(props: AuthService.SignInInput): Promise<AuthService.AuthResponse> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: props.email,
      password: props.password,
    })

    if (error) {
      console.error('Erro ao fazer login:', error.message)
      return {
        success: false,
        error: error.message,
      }
    }

    // Login realizado com sucesso
    console.log('Login realizado com sucesso:', data.user?.email)
    
    return {
      success: true,
      user: data.user,
      session: data.session,
    }
  } catch (error) {
    console.error('Erro inesperado ao fazer login:', error)
    return {
      success: false,
      error: 'Erro inesperado ao fazer login',
    }
  }
}

/**
 * Faz logout do usuário atual
 */
export async function signOut(): Promise<AuthService.AuthResponse> {
  try {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error('Erro ao fazer logout:', error.message)
      return {
        success: false,
        error: error.message,
      }
    }

    console.log('Logout realizado com sucesso')
    
    return {
      success: true,
    }
  } catch (error) {
    console.error('Erro inesperado ao fazer logout:', error)
    return {
      success: false,
      error: 'Erro inesperado ao fazer logout',
    }
  }
}

/**
 * Recupera a sessão atual do usuário
 */
export async function getCurrentSession(): Promise<AuthService.AuthResponse> {
  try {
    const { data, error } = await supabase.auth.getSession()

    if (error) {
      console.error('Erro ao recuperar sessão:', error.message)
      return {
        success: false,
        error: error.message,
      }
    }

    if (!data.session) {
      console.log('Nenhuma sessão ativa encontrada')
      return {
        success: false,
        error: 'Nenhuma sessão ativa encontrada',
      }
    }

    // Verifica se a sessão não expirou
    const now = Math.round(Date.now() / 1000)
    if (data.session.expires_at && data.session.expires_at < now) {
      console.log('Sessão expirada')
      return {
        success: false,
        error: 'Sessão expirada',
      }
    }

    console.log('Sessão recuperada com sucesso:', data.session.user?.email)
    
    return {
      success: true,
      user: data.session.user,
      session: data.session,
    }
  } catch (error) {
    console.error('Erro inesperado ao recuperar sessão:', error)
    return {
      success: false,
      error: 'Erro inesperado ao recuperar sessão',
    }
  }
}

/**
 * Recupera o usuário atual
 */
export async function getCurrentUser(): Promise<AuthService.AuthResponse> {
  try {
    const { data, error } = await supabase.auth.getUser()

    if (error) {
      console.error('Erro ao recuperar usuário:', error.message)
      return {
        success: false,
        error: error.message,
      }
    }

    if (!data.user) {
      return {
        success: false,
        error: 'Nenhum usuário autenticado encontrado',
      }
    }

    console.log('Usuário recuperado com sucesso:', data.user.email)
    
    return {
      success: true,
      user: data.user,
    }
  } catch (error) {
    console.error('Erro inesperado ao recuperar usuário:', error)
    return {
      success: false,
      error: 'Erro inesperado ao recuperar usuário',
    }
  }
}

/**
 * Solicita recuperação de senha por email
 */
export async function resetPassword(email: string): Promise<AuthService.AuthResponse> {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback`,
    })

    if (error) {
      console.error('Erro ao solicitar recuperação de senha:', error.message)
      return {
        success: false,
        error: error.message,
      }
    }

    console.log('Email de recuperação enviado para:', email)
    
    return {
      success: true,
    }
  } catch (error) {
    console.error('Erro inesperado ao solicitar recuperação:', error)
    return {
      success: false,
      error: 'Erro inesperado ao solicitar recuperação de senha',
    }
  }
}

/**
 * Atualiza a senha do usuário (usado após recuperação)
 */
export async function updatePassword(newPassword: string): Promise<AuthService.AuthResponse> {
  try {
    const { error } = await supabase.auth.updateUser({ 
      password: newPassword 
    })

    if (error) {
      console.error('Erro ao atualizar senha:', error.message)
      return {
        success: false,
        error: error.message,
      }
    }

    console.log('Senha atualizada com sucesso')
    
    return {
      success: true,
    }
  } catch (error) {
    console.error('Erro inesperado ao atualizar senha:', error)
    return {
      success: false,
      error: 'Erro inesperado ao atualizar senha',
    }
  }
}

/**
 * Monitora mudanças no estado de autenticação
 * Retorna uma função para cancelar a inscrição
 */
export function onAuthStateChange(callback: (session: any) => void) {
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((event, session) => {
    if (import.meta.env.DEV) {
      console.log('🔐 Auth State Change:', event, session?.user?.email || 'No user');
    }
    callback(session)
  })

  // Retorna função para cancelar a inscrição
  return () => subscription.unsubscribe()
}
