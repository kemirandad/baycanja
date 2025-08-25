'use client';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const Logo = () => (
  <Image
    src="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22256%22 height=%22256%22 viewBox=%220 0 256 256%22><path fill=%22%232c528c%22 d=%22M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88%22/><path fill=%22white%22 stroke=%22%232c528c%22 stroke-width=%228%22 d=%22M128 40a88 88 0 1 0 88 88a88.1 88.1 0 0 0-88-88%22/><text x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22central%22 text-anchor=%22middle%22 font-size=%2280%22 font-family=%22sans-serif%22 fill=%22%232c528c%22>SFJ</text></svg>"
    alt="Logo"
    width={24}
    height={24}
    className="h-6 w-6"
  />
);

export function Footer() {
  const pathname = usePathname();
  if (pathname === '/login') {
    return null;
  }
  return (
    <footer className="bg-secondary text-secondary-foreground mt-16">
      <div className="container py-8 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <Logo />
          <span className="font-bold text-lg">BAYCANJA Ranks</span>
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
