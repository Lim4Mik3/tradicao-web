import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header/index';
import MobileMenu from '@/components/Header/Mobile';
import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';
import { ToastContainer } from 'react-toastify';

type Props = {
  children: React.ReactNode;
} & ComponentProps<'main'>;

export function AppLayout({ children, className }: Props) {
  return (
    <main className={cn('antialiased h-screen', className)}>
      <Header />
      <MobileMenu />
      {children}
      <Footer />

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
  );
}
