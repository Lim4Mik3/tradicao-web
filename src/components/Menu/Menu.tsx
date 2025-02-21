import { LogoutButton } from "./LogoutButton";
import { Navigation } from "./Navigation";

export function Menu() {
  return (
    <aside
      className="h-full py-8 bg-white w-full max-w-[100px] flex flex-col items-center justify-between"
    >
      <img 
        alt="Short Logo" 
        src="/logo-tradicao.png" 
        className="w-15 h-15"
      />

      <Navigation />


      <LogoutButton />
    </aside>
  )
}