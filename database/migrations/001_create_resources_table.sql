-- Criação da tabela resources
CREATE TABLE IF NOT EXISTS public.resources (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('SERVICES', 'APPS', 'BRANDS', 'CONVINIENCES', 'CHANGE_OIL')),
    image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_resources_category ON public.resources(category);
CREATE INDEX IF NOT EXISTS idx_resources_created_at ON public.resources(created_at);

-- RLS (Row Level Security) - Permitir leitura para todos e escrita apenas para usuários autenticados
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

-- Política para leitura (todos podem ler)
CREATE POLICY "Todos podem visualizar recursos" ON public.resources
    FOR SELECT USING (true);

-- Política para inserção (apenas usuários autenticados)
CREATE POLICY "Usuários autenticados podem criar recursos" ON public.resources
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Política para atualização (apenas usuários autenticados)
CREATE POLICY "Usuários autenticados podem atualizar recursos" ON public.resources
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Política para deleção (apenas usuários autenticados)
CREATE POLICY "Usuários autenticados podem deletar recursos" ON public.resources
    FOR DELETE USING (auth.role() = 'authenticated');

-- Função para atualizar o campo updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar automaticamente o campo updated_at
CREATE TRIGGER update_resources_updated_at 
    BEFORE UPDATE ON public.resources 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
