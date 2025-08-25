'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Medal, Users, ListOrdered, User, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useScoresStore } from '@/store/scores-store';
import { useEffect, useState } from 'react';

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
            <Medal className="h-8 w-8 text-primary" />
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
