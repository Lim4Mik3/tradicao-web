import { useEffect, useId, useState } from 'react';
import { PhotoCard } from './PhotoCard';
import { Plus } from 'lucide-react';

type PhotoWithId = File & { id: string };

type Props = { title: string, hasError?: string; onChange: (photos: PhotoWithId[]) => void };

export function PhotoInput({ title, hasError, onChange }: Props) {
  const [photos, setPhotos] = useState<PhotoWithId[]>([]);
  const inputId = useId()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newPhotos: PhotoWithId[] = [];

    for (const file of e.target.files) {
      const photoWithId = Object.assign(file, { id: crypto.randomUUID() });
      newPhotos.push(photoWithId);
    }

    setPhotos(newPhotos);
  };

  const handleAddingMoreFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newPhotos: PhotoWithId[] = [];

    for (const file of e.target.files) {
      const photoWithId = Object.assign(file, { id: crypto.randomUUID() });
      newPhotos.push(photoWithId);
    }

    setPhotos(prev => ([...prev, ...newPhotos]));
  };

  const handleRemove = (id: string) => {
    setPhotos((prev) => prev.filter((photo) => photo.id !== id));
  };

  useEffect(() => { onChange(photos) }, [photos]);  

  if (photos.length === 0) {
    return (
      <div className="flex flex-col w-full">
        <span
          className="flex text-sm font-semibold text-gray-600 mb-1"
        >
          {title}
        </span>

        <label 
          htmlFor={inputId} 
          className="flex items-center justify-center border border-dashed border-gray-400 rounded-md py-10 hover:cursor-pointer hover:bg-black/10 transition-all duration-300 w-full h-full text-zinc-500 gap-1"
        >
          
          <input
            multiple
            type="file"
            id={inputId}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
            <Plus className="w-6 h-6" />
            <span className="text-md">Adicionar fotos</span>
        </label>

        { hasError && (<span className="text-xs font-semibold tracking-wide text-red-500">{hasError}</span>)}
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full">
      <span
        className="flex text-sm font-semibold text-gray-600 mb-4"
      >
        {title}
      </span>

      <div
        className='flex items-center justify-start gap-4 flex-wrap'
      >
        {photos.map((photo) => (
          <PhotoCard key={photo.id} file={photo} onRemove={handleRemove} />
        ))}

        <label 
          htmlFor={inputId} 
          className="flex grow-0 items-center justify-center border border-dashed border-gray-400 rounded-md p-4 w-[10rem] h-[12rem] hover:cursor-pointer hover:bg-black/10 transition-all duration-300 text-zinc-500 gap-2"
        >
          <input
            multiple
            type="file"
            id={inputId}
            className="hidden"
            accept="image/*"
            onChange={handleAddingMoreFiles}
          />
            <Plus size={40} />
            <span className="text-base">Adicionar mais fotos</span>
        </label>
      </div>
      { hasError && (<span className="text-xs font-semibold tracking-wide text-red-500 mt-1">{hasError}</span>)}
    </div>
  );
}