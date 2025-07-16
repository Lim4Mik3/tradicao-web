-- Criação do bucket para armazenar imagens dos recursos
INSERT INTO storage.buckets (id, name, public)
VALUES ('resource-images', 'resource-images', true);

-- Política para permitir upload de imagens (apenas usuários autenticados)
CREATE POLICY "Usuários autenticados podem fazer upload de imagens" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'resource-images' 
        AND auth.role() = 'authenticated'
        AND (LOWER(RIGHT(name, 4)) = '.jpg' 
             OR LOWER(RIGHT(name, 4)) = '.png' 
             OR LOWER(RIGHT(name, 5)) = '.jpeg' 
             OR LOWER(RIGHT(name, 4)) = '.gif' 
             OR LOWER(RIGHT(name, 5)) = '.webp')
    );

-- Política para permitir visualização de imagens (público)
CREATE POLICY "Todos podem visualizar imagens dos recursos" ON storage.objects
    FOR SELECT USING (bucket_id = 'resource-images');

-- Política para permitir atualização de imagens (apenas usuários autenticados)
CREATE POLICY "Usuários autenticados podem atualizar imagens" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'resource-images' 
        AND auth.role() = 'authenticated'
    );

-- Política para permitir deleção de imagens (apenas usuários autenticados)
CREATE POLICY "Usuários autenticados podem deletar imagens" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'resource-images' 
        AND auth.role() = 'authenticated'
    );
