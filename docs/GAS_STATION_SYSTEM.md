# Sistema de Gestão de Postos de Gasolina

## 📋 Visão Geral

Este sistema permite o cadastro e gerenciamento de postos de gasolina usando Supabase como backend, com funcionalidades de geolocalização para buscas por proximidade.

## 🚀 Funcionalidades Implementadas

### ✅ Cadastro de Postos
- Formulário completo com validação usando Zod
- Upload de imagens para Supabase Storage
- Busca automática de endereços via Google Places API
- Coordenadas geográficas salvas automaticamente
- Campos para serviços, conveniências, marcas, etc.

### ✅ Busca por Proximidade
- Função SQL otimizada usando PostGIS
- Busca de postos próximos ao usuário
- Cálculo de distância em tempo real

### ✅ Modelo de Dados
- Classe `GasStationModel` seguindo padrões de Domain-Driven Design
- Tipos TypeScript bem definidos
- Integração com Supabase usando SQL nativo

## 🗄️ Estrutura do Banco de Dados

### Tabela: `gas_stations`
```sql
- id (UUID) - Chave primária
- name (VARCHAR) - Nome do posto
- email (VARCHAR) - Email de contato
- address (JSONB) - Dados completos do endereço
- filial_number (VARCHAR) - Número da filial
- phone, mobile, whatsapp (VARCHAR) - Contatos
- comercial_hours, holidays_hours (TEXT) - Horários
- manager (VARCHAR) - ID do gerente
- enabled (BOOLEAN) - Posto ativo/inativo
- location (GEOGRAPHY) - Coordenadas para busca spatial
- images, conveniences, oil_changes, services, brands, apps (TEXT[]) - Arrays de recursos
- created_at, updated_at (TIMESTAMP) - Timestamps
```

### Índices para Performance
- GiST para localização geográfica
- GIN para busca no endereço JSON
- Índices regulares para campos frequentemente consultados

## 📁 Arquivos Criados/Modificados

### Modelos
- `src/models/GasStation.ts` - Classe principal do domínio
- `src/utils/optional-type.ts` - Tipo utilitário

### Serviços
- `src/services/CreateGasStation.ts` - Criação usando Supabase
- `src/services/GetPlaceDetails.ts` - Busca detalhes de endereço
- `src/services/UploadGasStationImages.ts` - Upload de imagens
- `src/services/GetGasStationsFromSupabase.ts` - Listagem dos postos
- `src/services/SearchNearbyGasStations.ts` - Busca por proximidade
- `src/services/DeleteGasStationFromSupabase.ts` - Exclusão de postos

### Hooks
- `src/hooks/useNearbyGasStations.tsx` - Hook para busca por proximidade
- Atualizações nos hooks existentes para usar Supabase

### Banco de Dados
- `database/migrations/002_create_gas_stations_table.sql` - Schema completo
- `database/functions/search_nearby_gas_stations.sql` - Função de busca

## 🔧 Instruções de Setup

### 1. Execute as Migrações no Supabase

No SQL Editor do Supabase, execute em ordem:

1. **Criação da tabela e índices:**
```sql
-- Copie e cole o conteúdo de: database/migrations/002_create_gas_stations_table.sql
```

2. **Função de busca por proximidade:**
```sql
-- Copie e cole o conteúdo de: database/functions/search_nearby_gas_stations.sql
```

### 2. Configuração do Storage

O bucket `gas-station-images` é criado automaticamente pela migração com as políticas de acesso adequadas.

### 3. Variáveis de Ambiente

Certifique-se de que seu `.env` contém:
```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima
```

## 🎯 Como Usar

### Criar um Novo Posto
1. Acesse `/backoffice/create-gas-station`
2. Preencha todos os campos obrigatórios
3. Selecione o endereço (coordenadas são obtidas automaticamente)
4. Adicione imagens (opcional)
5. Configure serviços, marcas, conveniências
6. Salve o posto

### Buscar Postos Próximos
```typescript
const { data, isLoading } = useNearbyGasStations({
  latitude: -23.5505,
  longitude: -46.6333,
  radiusKm: 10,
  limit: 20
});
```

### Listar Todos os Postos
```typescript
const { data, isLoading } = useGetGasStations({
  limit: 15,
  offset: 0,
  enabled: true
});
```

## 🔍 Funcionalidades Avançadas

### Busca Geográfica
- Usa índices GiST do PostGIS para performance
- Busca por raio em quilômetros
- Ordenação por distância
- Filtragem por postos ativos

### Upload de Imagens
- Storage otimizado no Supabase
- Múltiplas imagens por posto
- URLs públicas geradas automaticamente
- Cleanup automático ao deletar posto

### Validação de Dados
- Schema Zod completo
- Validação de email, telefones
- Coordenadas obrigatórias
- Campos opcionais bem definidos

## 🚨 Próximos Passos

1. **Sistema de Roles:** Implementar diferentes níveis de acesso
2. **Edição de Postos:** Formulário de edição
3. **Filtros Avançados:** Busca por serviços, marcas, etc.
4. **Dashboard Analytics:** Estatísticas dos postos
5. **API de Integração:** Endpoints para apps mobile

## 📝 Notas Técnicas

- **PostGIS:** Extensão habilitada automaticamente no Supabase
- **Performance:** Índices otimizados para consultas geográficas
- **Segurança:** RLS (Row Level Security) pode ser adicionado conforme necessário
- **Escalabilidade:** Arquitetura preparada para milhares de postos
