import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import MobileMenu from '@/components/Header/Mobile';
import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';

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
    </main>
  );
}
