-- Script para verificar e corrigir o schema da tabela gas_stations
-- Execute este script no SQL Editor do Supabase

-- 1. Verificar a estrutura atual da tabela
SELECT 
    column_name, 
    data_type, 
    character_maximum_length,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'gas_stations' 
ORDER BY ordinal_position;

-- 2. Aplicar todas as migrações se necessário

-- Migração 003: Remover campos manager e enabled (se ainda existirem)
ALTER TABLE gas_stations 
DROP COLUMN IF EXISTS manager,
DROP COLUMN IF EXISTS enabled;

-- Migração 004: Aumentar tamanho dos campos de telefone
ALTER TABLE gas_stations 
ALTER COLUMN phone TYPE VARCHAR(30),
ALTER COLUMN mobile TYPE VARCHAR(30),
ALTER COLUMN whatsapp TYPE VARCHAR(30);

-- 3. Verificar novamente a estrutura após as correções
SELECT 
    column_name, 
    data_type, 
    character_maximum_length,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'gas_stations' 
ORDER BY ordinal_position;
