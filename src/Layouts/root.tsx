import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import { ToastContainer } from "react-toastify";

type Props =  {
  children: React.ReactNode;
} & ComponentProps<'main'>;

export function RootLayout({ children, className }: Props) {
  return (
    <main className={cn("h-screen", className)}>
      {children}
      
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </main>
  )
}