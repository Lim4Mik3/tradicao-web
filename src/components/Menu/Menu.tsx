import { Navigation } from "./Navigation";

export function Menu() {
  return (
    <aside
      className="h-full py-8 bg-white w-full max-w-[100px] flex flex-col items-center justify-between border-r border-zinc-300"
    >
      <img 
        alt="Short Logo" 
        src="/bg-icon.png" 
        className="w-12 h-12"
      />

      <Navigation />
    </aside>
  )
}