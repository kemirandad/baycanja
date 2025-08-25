
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Users, ListOrdered, User, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useScoresStore } from '@/store/scores-store';
import { useEffect, useState } from 'react';

const Logo = () => (
  <Image
    src="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22256%22 height=%22256%22 viewBox=%220 0 100 125%22><path fill=%22%232c528c%22 d=%22M82.47 16.2S69.3 12.36 50 12.36c-19.3 0-32.47 3.84-32.47 3.84S13.69 22.84 13.69 50c0 27.16 3.84 33.8 3.84 33.8S30.7 87.64 50 87.64c19.3 0 32.47-3.84 32.47-3.84S86.31 77.16 86.31 50c0-27.16-3.84-33.8-3.84-33.8zM50 18.3c16.32.14 28.53 3.12 28.53 3.12S80.17 26.24 80.17 50c0 23.76-1.64 28.58-1.64 28.58S66.32 81.7 50 81.56c-16.32-.14-28.53-3.12-28.53-3.12S19.83 73.76 19.83 50c0-23.76 1.64-28.58 1.64-28.58S33.68 18.16 50 18.3z%22/><path fill=%22white%22 d=%22M50 18.3c-16.32-.14-28.53 3.12-28.53 3.12S19.83 26.24 19.83 50c0 23.76 1.64 28.58 1.64 28.58S33.68 81.7 50 81.56c16.32.14 28.53-3.12 28.53-3.12S80.17 73.76 80.17 50c0-23.76-1.64-28.58-1.64-28.58S66.32 18.16 50 18.3z%22/><text x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22central%22 text-anchor=%22middle%22 font-size=%2228%22 font-family=%22sans-serif%22 fill=%22%232c528c%22>SFJ</text></svg>"
    alt="Logo"
    width={40}
    height={40}
    className="h-8 w-8"
  />
);

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, setCurrentUser } = useScoresStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = () => {
    setCurrentUser(null);
    router.push('/login');
  };

  const navItems = [
    { href: '/', label: 'Participantes', icon: Users },
    { href: '/leaderboard', label: 'Resultados', icon: ListOrdered },
  ];
  
  if (!isClient) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm">
        <div className="container flex h-20 items-center" />
      </header>
    );
  }

  if (pathname === '/login') {
    return null;
  }
  
  if (pathname === '/public-results') {
    return (
       <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm">
         <div className="container flex h-20 items-center justify-center">
          <Link href="/login" className="flex items-center space-x-3">
              <Logo />
              <span className="text-2xl font-bold tracking-tight">BAYCANJA</span>
          </Link>
         </div>
       </header>
    )
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-3">
            <Logo />
            <span className="hidden sm:inline-block text-2xl font-bold tracking-tight">BAYCANJA</span>
          </Link>
        </div>
        
        {currentUser && (
          <>
            <nav className="hidden md:flex items-center gap-2">
                {navItems.map((item) => (
                  <Button
                    asChild
                    variant="link"
                    key={item.href}
                    className={cn(
                      'text-lg text-muted-foreground transition-colors hover:text-primary',
                      pathname === item.href && 'text-primary font-bold'
                    )}
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </Button>
                ))}
            </nav>

            <div className="hidden md:flex items-center justify-end gap-4">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-muted-foreground" />
                <span className="font-semibold">{currentUser.username}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Salir
              </Button>
            </div>
            
            <div className="flex md:hidden items-center justify-end">
              {navItems.map((item) => (
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  key={item.href}
                  className={cn('ml-1', pathname === item.href && 'bg-accent')}
                >
                  <Link href={item.href} aria-label={item.label}>
                    <item.icon className="h-5 w-5" />
                  </Link>
                </Button>
              ))}
              <Button variant="ghost" size="icon" onClick={handleLogout} className="ml-2">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
