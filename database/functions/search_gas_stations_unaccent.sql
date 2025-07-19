-- Função para busca insensível a acentuação
CREATE OR REPLACE FUNCTION search_gas_stations_unaccent(
  search_term TEXT,
  result_limit INTEGER DEFAULT 100,
  result_offset INTEGER DEFAULT 0
)
RETURNS TABLE (
  id UUID,
  name VARCHAR(255),
  email VARCHAR(255),
  address JSONB,
  filial_number VARCHAR(50),
  phone VARCHAR(20),
  mobile VARCHAR(20),
  whatsapp VARCHAR(20),
  comercial_hours TEXT,
  holidays_hours TEXT,
  images TEXT[],
  conveniences TEXT[],
  oil_changes TEXT[],
  services TEXT[],
  brands TEXT[],
  apps TEXT[],
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    gs.id,
    gs.name,
    gs.email,
    gs.address,
    gs.filial_number,
    gs.phone,
    gs.mobile,
    gs.whatsapp,
    gs.comercial_hours,
    gs.holidays_hours,
    gs.images,
    gs.conveniences,
    gs.oil_changes,
    gs.services,
    gs.brands,
    gs.apps,
    gs.created_at,
    gs.updated_at
  FROM gas_stations gs
  WHERE (
    unaccent(lower(gs.name)) LIKE '%' || unaccent(lower(search_term)) || '%'
    OR unaccent(lower(gs.address->>'city')) LIKE '%' || unaccent(lower(search_term)) || '%'
    OR unaccent(lower(gs.address->>'neighborhood')) LIKE '%' || unaccent(lower(search_term)) || '%'
    OR unaccent(lower(gs.address->>'route')) LIKE '%' || unaccent(lower(search_term)) || '%'
  )
  ORDER BY gs.created_at DESC
  LIMIT result_limit OFFSET result_offset;
END;
$$ LANGUAGE plpgsql;
