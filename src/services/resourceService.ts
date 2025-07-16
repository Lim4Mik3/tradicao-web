import { supabase } from '@/infra/supabase';
import { ResourceModel, ResourceCategory } from '@/models/Resource';

export class ResourceService {
  private static readonly STORAGE_BUCKET = 'resource-images';
  private static readonly TABLE_NAME = 'resources';

  /**
   * Faz upload da imagem para o Supabase Storage
   */
  private static async uploadImage(file: File): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `resources/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(this.STORAGE_BUCKET)
      .upload(filePath, file);

    if (uploadError) {
      throw new Error(`Erro ao fazer upload da imagem: ${uploadError.message}`);
    }

    // Obter URL pública da imagem
    const { data: { publicUrl } } = supabase.storage
      .from(this.STORAGE_BUCKET)
      .getPublicUrl(filePath);

    return publicUrl;
  }

  /**
   * Remove imagem do storage
   */
  private static async deleteImage(imageUrl: string): Promise<void> {
    try {
      // Extrair o caminho do arquivo da URL
      const url = new URL(imageUrl);
      const pathParts = url.pathname.split('/');
      const filePath = pathParts.slice(-2).join('/'); // resources/filename.ext

      const { error } = await supabase.storage
        .from(this.STORAGE_BUCKET)
        .remove([filePath]);

      if (error) {
        console.warn('Erro ao deletar imagem do storage:', error.message);
      }
    } catch (error) {
      console.warn('Erro ao processar URL da imagem:', error);
    }
  }

  /**
   * Cria um novo recurso
   */
  static async create(data: {
    title: string;
    category: ResourceCategory;
    image: File;
  }): Promise<ResourceModel> {
    try {
      // 1. Upload da imagem
      const imageUrl = await this.uploadImage(data.image);

      // 2. Criar registro no banco
      const now = new Date().toISOString();
      const resourceData = {
        title: data.title,
        category: data.category,
        image: imageUrl,
        created_at: now,
        updated_at: now,
      };

      const { data: insertedData, error } = await supabase
        .from(this.TABLE_NAME)
        .insert(resourceData)
        .select()
        .single();

      if (error) {
        // Se houve erro ao inserir no banco, remove a imagem do storage
        await this.deleteImage(imageUrl);
        throw new Error(`Erro ao criar recurso: ${error.message}`);
      }

      return ResourceModel.create({
        id: insertedData.id,
        title: insertedData.title,
        category: insertedData.category,
        image: insertedData.image,
        createdAt: insertedData.created_at,
        updatedAt: insertedData.updated_at,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Erro interno ao criar recurso');
    }
  }

  /**
   * Busca todos os recursos
   */
  static async findAll(): Promise<ResourceModel[]> {
    const { data, error } = await supabase
      .from(this.TABLE_NAME)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Erro ao buscar recursos: ${error.message}`);
    }

    return data.map((item) =>
      ResourceModel.create({
        id: item.id,
        title: item.title,
        category: item.category,
        image: item.image,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      })
    );
  }

  /**
   * Busca um recurso por ID
   */
  static async findById(id: string): Promise<ResourceModel | null> {
    const { data, error } = await supabase
      .from(this.TABLE_NAME)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Recurso não encontrado
      }
      throw new Error(`Erro ao buscar recurso: ${error.message}`);
    }

    return ResourceModel.create({
      id: data.id,
      title: data.title,
      category: data.category,
      image: data.image,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    });
  }

  /**
   * Atualiza um recurso
   */
  static async update(
    id: string,
    data: {
      title?: string;
      category?: ResourceCategory;
      image?: File;
    }
  ): Promise<ResourceModel> {
    try {
      // Buscar o recurso atual
      const currentResource = await this.findById(id);
      if (!currentResource) {
        throw new Error('Recurso não encontrado');
      }

      let imageUrl = currentResource.image;

      // Se uma nova imagem foi fornecida
      if (data.image) {
        // Upload da nova imagem
        const newImageUrl = await this.uploadImage(data.image);
        
        // Deletar a imagem antiga se existir
        if (currentResource.image) {
          await this.deleteImage(currentResource.image);
        }
        
        imageUrl = newImageUrl;
      }

      // Atualizar no banco
      const updateData = {
        ...(data.title && { title: data.title }),
        ...(data.category && { category: data.category }),
        ...(imageUrl && { image: imageUrl }),
        updated_at: new Date().toISOString(),
      };

      const { data: updatedData, error } = await supabase
        .from(this.TABLE_NAME)
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error(`Erro ao atualizar recurso: ${error.message}`);
      }

      return ResourceModel.create({
        id: updatedData.id,
        title: updatedData.title,
        category: updatedData.category,
        image: updatedData.image,
        createdAt: updatedData.created_at,
        updatedAt: updatedData.updated_at,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Erro interno ao atualizar recurso');
    }
  }

  /**
   * Deleta um recurso
   */
  static async delete(id: string): Promise<void> {
    try {
      // Buscar o recurso para obter a URL da imagem
      const resource = await this.findById(id);
      if (!resource) {
        throw new Error('Recurso não encontrado');
      }

      // Deletar do banco
      const { error } = await supabase
        .from(this.TABLE_NAME)
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error(`Erro ao deletar recurso: ${error.message}`);
      }

      // Deletar a imagem do storage
      if (resource.image) {
        await this.deleteImage(resource.image);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Erro interno ao deletar recurso');
    }
  }

  /**
   * Busca recursos por categoria
   */
  static async findByCategory(category: ResourceCategory): Promise<ResourceModel[]> {
    const { data, error } = await supabase
      .from(this.TABLE_NAME)
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Erro ao buscar recursos por categoria: ${error.message}`);
    }

    return data.map((item) =>
      ResourceModel.create({
        id: item.id,
        title: item.title,
        category: item.category,
        image: item.image,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      })
    );
  }
}
