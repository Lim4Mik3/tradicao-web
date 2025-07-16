-- Remove manager e enabled fields from gas_stations table
-- Migration 003: Remove manager and enabled fields

-- Remove index on enabled field first
DROP INDEX IF EXISTS idx_gas_stations_enabled;

-- Remove manager and enabled columns
ALTER TABLE gas_stations 
DROP COLUMN IF EXISTS manager,
DROP COLUMN IF EXISTS enabled;

-- Drop the existing function first
DROP FUNCTION IF EXISTS search_nearby_gas_stations(double precision, double precision, double precision, integer);

-- Update the search function to remove manager and enabled references
CREATE OR REPLACE FUNCTION search_nearby_gas_stations(
  user_lat DOUBLE PRECISION,
  user_lng DOUBLE PRECISION,
  radius_km DOUBLE PRECISION DEFAULT 10,
  result_limit INTEGER DEFAULT 20
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
  distance_km DOUBLE PRECISION,
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
    ST_Distance(
      gs.location::geography,
      ST_SetSRID(ST_MakePoint(user_lng, user_lat), 4326)::geography
    ) / 1000 AS distance_km,
    gs.created_at,
    gs.updated_at
  FROM gas_stations gs
  WHERE ST_DWithin(
      gs.location::geography,
      ST_SetSRID(ST_MakePoint(user_lng, user_lat), 4326)::geography,
      radius_km * 1000
    )
  ORDER BY distance_km ASC
  LIMIT result_limit;
END;
$$ LANGUAGE plpgsql;
