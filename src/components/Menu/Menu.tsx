import { Navigation } from "./Navigation";
import { SessionButton } from "./SessionButton";

export function Menu() {
  return (
    <aside
      className="h-full py-8 bg-zinc-100 w-full max-w-[100px] flex flex-col items-center justify-between border-r border-zinc-300"
    >
      <img 
        alt="Short Logo" 
        src="/logo-tradicao.png" 
        className="w-15 h-15"
      />

      <Navigation />


      <SessionButton />
    </aside>
  )
}