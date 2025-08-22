'use client';
import { usePathname } from 'next/navigation';
import { Medal } from 'lucide-react';

export function Footer() {
  const pathname = usePathname();
  if (pathname === '/login') {
    return null;
  }
  return (
    <footer className="bg-secondary text-secondary-foreground mt-16">
      <div className="container py-8 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
        <div className="flex items-center space-x-2 mb-4 sm:mb-0">
          <Medal className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">BAYCANJA Ranks</span>
        </div>
        <div>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Evento BAYCANJA. Todos los derechos reservados.
          </p>
          <p className="text-xs text-muted-foreground">
            Plataforma de calificación con ❤️.
          </p>
        </div>
      </div>
    </footer>
  );
}