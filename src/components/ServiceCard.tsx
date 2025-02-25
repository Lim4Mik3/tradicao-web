import { useId } from "react"

export function ServiceCard() {
  const id = useId();

  return (
    <label 
      htmlFor={id} 
      className="bg-gray-100 rounded-sm inline-flex hover:opacity-85 transition-all opacity-60 has-[:checked]:opacity-100 has-[:checked]:bg-green-600/20 hover:cursor-pointer overflow-hidden border border-gray-400/10 has-[:checked]:border-green-600/80 max-w-[213px] aspect-square"
    >
      <input id={id} type="checkbox" className="hidden" />
      
      <div
        className="flex flex-col items-center justify-around"
      >
        <img 
          alt="asd" 
          className="w-10 h-10 my-4"
          src="https://png.pngtree.com/png-vector/20190420/ourmid/pngtree-vector-fuel-station-icon-png-image_965104.jpg" 
        />

        <span
          className="text-left text-zinc-900 text-lg px-4 border-gray-500/20"
        >
          asdadsadasdsad
        </span>
      </div>
    </label>
  )
}