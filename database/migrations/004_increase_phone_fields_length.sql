-- Migration 004: Increase phone fields length
-- Aumentar o tamanho dos campos de telefone para suportar números brasileiros completos

-- Aumentar tamanho dos campos de telefone
ALTER TABLE gas_stations 
ALTER COLUMN phone TYPE VARCHAR(30),
ALTER COLUMN mobile TYPE VARCHAR(30),
ALTER COLUMN whatsapp TYPE VARCHAR(30);

-- Comentário sobre o formato esperado
COMMENT ON COLUMN gas_stations.phone IS 'Telefone da unidade (máximo 30 caracteres, formato: +55 XX XXXX-XXXX)';
COMMENT ON COLUMN gas_stations.mobile IS 'Celular da unidade (máximo 30 caracteres, formato: +55 XX 9XXXX-XXXX)';
COMMENT ON COLUMN gas_stations.whatsapp IS 'WhatsApp da unidade (máximo 30 caracteres, formato: +55 XX 9XXXX-XXXX)';
