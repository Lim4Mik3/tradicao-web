import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

const supabaseUrl = 'https://jsocbqrclmwtdyiugndo.supabase.co'
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impzb2NicXJjbG13dGR5aXVnbmRvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjUzNjczMiwiZXhwIjoyMDY4MTEyNzMyfQ.DnE7qS1qKUo-m_RP_lZw0G3CQ1x9k_0K5DYDaV-x9fU' // Você precisará da service role key

const supabase = createClient(supabaseUrl, serviceRoleKey)

async function runMigration() {
  try {
    console.log('🚀 Executando migração da tabela gas_stations...')
    
    const migrationPath = path.join(process.cwd(), 'database', 'migrations', '002_create_gas_stations_table.sql')
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8')
    
    const { error } = await supabase.rpc('exec_sql', { sql: migrationSQL })
    
    if (error) {
      console.error('❌ Erro ao executar migração:', error)
      return
    }
    
    console.log('✅ Migração executada com sucesso!')
    
  } catch (error) {
    console.error('❌ Erro:', error)
  }
}

runMigration()
