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
    src="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22256%22 height=%22256%22 viewBox=%220 0 256 256%22><path fill=%22%232c528c%22 d=%22M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88%22/><path fill=%22white%22 stroke=%22%232c528c%22 stroke-width=%228%22 d=%22M128 40a88 88 0 1 0 88 88a88.1 88.1 0 0 0-88-88%22/><text x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22central%22 text-anchor=%22middle%22 font-size=%2280%22 font-family=%22sans-serif%22 fill=%22%232c528c%22>SFJ</text></svg>"
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
  
  if (pathname === '/login') {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm">
      <div className="container flex h-20 items-center">
        <div className="flex-1 flex items-center justify-start">
           <Link href="/" className="flex items-center space-x-3">
            <Logo />
            <span className="text-2xl font-bold tracking-tight">BAYCANJA Ranks</span>
          </Link>
        </div>

        <nav className="hidden md:flex flex-1 items-center justify-center gap-2">
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

        <div className="hidden md:flex flex-1 items-center justify-end gap-4">
          {isClient && currentUser && (
            <>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-muted-foreground" />
                <span className="font-semibold">{currentUser.username}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Salir
              </Button>
            </>
          )}
        </div>
        
        {/* Mobile Nav */}
        <div className="flex md:hidden items-center justify-end w-full">
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
           {isClient && currentUser && (
            <Button variant="ghost" size="icon" onClick={handleLogout} className="ml-2">
              <LogOut className="h-5 w-5" />
            </Button>
           )}
        </div>
      </div>
    </header>
  );
}
