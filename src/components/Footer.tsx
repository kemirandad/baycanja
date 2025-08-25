
'use client';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const Logo = () => (
  <Image
    src="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22256%22 height=%22256%22 viewBox=%220 0 100 125%22><path fill=%22%232c528c%22 d=%22M82.47 16.2S69.3 12.36 50 12.36c-19.3 0-32.47 3.84-32.47 3.84S13.69 22.84 13.69 50c0 27.16 3.84 33.8 3.84 33.8S30.7 87.64 50 87.64c19.3 0 32.47-3.84 32.47-3.84S86.31 77.16 86.31 50c0-27.16-3.84-33.8-3.84-33.8zM50 18.3c16.32.14 28.53 3.12 28.53 3.12S80.17 26.24 80.17 50c0 23.76-1.64 28.58-1.64 28.58S66.32 81.7 50 81.56c-16.32-.14-28.53-3.12-28.53-3.12S19.83 73.76 19.83 50c0-23.76 1.64-28.58 1.64-28.58S33.68 18.16 50 18.3z%22/><path fill=%22white%22 d=%22M50 18.3c-16.32-.14-28.53 3.12-28.53 3.12S19.83 26.24 19.83 50c0 23.76 1.64 28.58 1.64 28.58S33.68 81.7 50 81.56c16.32.14 28.53-3.12 28.53-3.12S80.17 73.76 80.17 50c0-23.76-1.64-28.58-1.64-28.58S66.32 18.16 50 18.3z%22/><text x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22central%22 text-anchor=%22middle%22 font-size=%2228%22 font-family=%22sans-serif%22 fill=%22%232c528c%22>SFJ</text></svg>"
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
      <div className="container py-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <div className="flex items-center space-x-2">
          <Logo />
          <span className="font-bold text-lg">BAYCANJA</span>
        </div>
        <div className="flex flex-col items-center sm:items-end">
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
