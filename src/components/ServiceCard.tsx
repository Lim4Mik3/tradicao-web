import { useId } from 'react';

type ServiceCardProps = {
  resource: {
    id: string;
    title: string;
    category: string;
    image?: string;
    createdAt: string;
    updatedAt: string;
  };
  isSelected: boolean;
  onToggle: () => void;
};

export function ServiceCard({ resource, isSelected, onToggle }: ServiceCardProps) {
  const id = useId();

  return (
    <label
      htmlFor={id}
      className={`bg-gray-100 rounded-sm inline-flex hover:opacity-85 transition-all ${isSelected ? 'opacity-100 bg-green-600/20 border-green-600/80' : 'opacity-60 border-gray-400/10'} hover:cursor-pointer overflow-hidden border has-[:checked]:border-green-600/80 max-w-[213px] aspect-square`}
    >
      <input
        id={id}
        type="checkbox"
        className="hidden"
        checked={isSelected}
        onChange={onToggle}
      />

      <div className="flex flex-col items-center justify-around">
        <img
          alt={resource.title}
          className="w-10 h-10 my-4"
          src={resource.image || 'https://png.pngtree.com/png-vector/20190420/ourmid/pngtree-vector-fuel-station-icon-png-image_965104.jpg'}
        />

        <span className="text-left text-zinc-900 text-lg px-4 border-gray-500/20">
          {resource.title}
        </span>
      </div>
    </label>
  );
}