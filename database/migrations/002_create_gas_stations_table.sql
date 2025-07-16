-- Habilitação da extensão PostGIS (necessária para tipos geográficos)
CREATE EXTENSION IF NOT EXISTS postgis;

-- Criação da tabela gas_stations
CREATE TABLE IF NOT EXISTS gas_stations (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  
  -- Campos de endereço (estrutura JSON mas separados para indexação)
  address JSONB NOT NULL,
  
  filial_number VARCHAR(50) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  mobile VARCHAR(20) NOT NULL,
  whatsapp VARCHAR(20) NOT NULL,
  comercial_hours TEXT NOT NULL,
  holidays_hours TEXT NOT NULL,
  manager VARCHAR(255) NOT NULL,
  enabled BOOLEAN DEFAULT true,
  
  -- Localização geográfica para busca spatial
  location GEOGRAPHY(POINT, 4326) NOT NULL,
  
  -- Arrays de recursos
  images TEXT[] DEFAULT '{}',
  conveniences TEXT[] DEFAULT '{}',
  oil_changes TEXT[] DEFAULT '{}',
  services TEXT[] DEFAULT '{}',
  brands TEXT[] DEFAULT '{}',
  apps TEXT[] DEFAULT '{}',
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_gas_stations_location ON gas_stations USING GIST (location);
CREATE INDEX IF NOT EXISTS idx_gas_stations_enabled ON gas_stations (enabled);
CREATE INDEX IF NOT EXISTS idx_gas_stations_name ON gas_stations (name);
CREATE INDEX IF NOT EXISTS idx_gas_stations_filial_number ON gas_stations (filial_number);

-- Índice GIN para busca no endereço JSON
CREATE INDEX IF NOT EXISTS idx_gas_stations_address ON gas_stations USING GIN (address);

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_gas_stations_updated_at
    BEFORE UPDATE ON gas_stations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Criação do bucket para imagens (se não existir)
INSERT INTO storage.buckets (id, name, public)
VALUES ('gas-station-images', 'gas-station-images', true)
ON CONFLICT (id) DO NOTHING;

-- Políticas de acesso ao storage
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'gas-station-images');
CREATE POLICY "Authenticated users can upload gas station images" ON storage.objects 
  FOR INSERT WITH CHECK (bucket_id = 'gas-station-images' AND auth.role() = 'authenticated');
CREATE POLICY "Users can update their own gas station images" ON storage.objects 
  FOR UPDATE USING (bucket_id = 'gas-station-images' AND auth.role() = 'authenticated');
CREATE POLICY "Users can delete their own gas station images" ON storage.objects 
  FOR DELETE USING (bucket_id = 'gas-station-images' AND auth.role() = 'authenticated');
