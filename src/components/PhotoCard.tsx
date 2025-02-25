import { Trash } from 'lucide-react';
import { useState, useEffect } from 'react';

type Props = {
  file: File & { id: string };
  onRemove?: (id: string) => void;
}

export function PhotoCard({ file, onRemove }: Props) {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const reader = new FileReader();
    
    reader.onload = () => {
      setImage(reader.result as string);
    };
    
    reader.readAsDataURL(file);
  }, [file]);

  return (
    <div
      className='border-2 border-zinc-300 inline-block w-[10rem] h-[12rem] rounded-lg relative'
    >
      {image && (
        <img 
          src={image} 
          alt={file.name} 
          className='object-cover w-full h-full rounded-lg'
        />
      )}

      <button
        data-tooltip="Remover foto"
        className='absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm opacity-0 hover:cursor-pointer hover:opacity-100 transition-all duration-300'
        onClick={onRemove ? () => onRemove(file.id) : undefined}
      >
        <Trash size={32} className='text-white' />
      </button>
    </div>
  );
}