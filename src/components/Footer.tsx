
'use client';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const Logo = () => (
  <Image
    src="/logo.svg"
    alt="Logo"
    width={24}
    height={24}
    className="h-6 w-6"
  />
);

export function Footer() {
  const pathname = usePathname();
  if (pathname === '/login' || pathname === '/public-results') {
    return null;
  }
  return (
    <footer className="bg-secondary text-secondary-foreground mt-16">
      <div className="container py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Logo />
          <span className="font-bold text-lg">BAYCANJA</span>
        </div>
        <div className="flex flex-col items-center sm:items-end text-center sm:text-right">
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
