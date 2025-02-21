import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export function Modal() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [component, setContent] = useState<React.ReactNode | null>(null);
  const itself = useRef(null)

  useEffect(() => {
    const handleOpenModal = (event: CustomEvent) => {
      setContent(event.detail.component);
      setIsVisible(true);
      setIsMounted(true);
    };
    window.addEventListener("openmodal", handleOpenModal as EventListener);
    return () => window.removeEventListener("openmodal", handleOpenModal as EventListener);
  }, []);

  useEffect(() => {
    const handleCloseModal = () => {
      setContent(null); 
      setIsVisible(false);
    };

    window.addEventListener("closemodal", handleCloseModal as EventListener);

    return () => {
      window.removeEventListener("closemodal", handleCloseModal as EventListener);
    };
  }, []);

  const handleBackdropClose = () => {
    setIsVisible(false);
  }

  if (!isMounted) return null;

  return (
    <div
      ref={itself}
      data-modalopened={true}
      className={cn(
        "bg-black/50 backdrop-blur-xs w-screen h-screen absolute inset-0 flex items-center justify-center",
        "transition-all duration-200 ease-in-out", 
        {
          "opacity-100 delay-100": isVisible,
          "opacity-0 pointer-events-none": !isVisible,
        }
      )}
      onClick={e => {
        if (e.target === itself.current) handleBackdropClose()
      }}
    >
      {component}
    </div>
  )
}