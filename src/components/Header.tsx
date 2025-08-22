'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Medal, Users, ListOrdered, BrainCircuit } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Participantes', icon: Users },
    { href: '/leaderboard', label: 'Resultados', icon: ListOrdered },
    { href: '/ai-advisor', label: 'Asesor IA', icon: BrainCircuit },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Medal className="h-6 w-6 text-primary" />
            <span className="font-bold">BAYCANJA Ranks</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-4 ml-auto">
          {navItems.map((item) => (
            <Button
              asChild
              variant="link"
              key={item.href}
              className={cn(
                'text-muted-foreground',
                pathname === item.href && 'text-primary font-semibold'
              )}
            >
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </nav>
        <div className="flex md:hidden items-center ml-auto space-x-1">
          {navItems.map((item) => (
            <Button
              asChild
              variant="ghost"
              size="icon"
              key={item.href}
              className={cn(pathname === item.href && 'bg-accent')}
            >
              <Link href={item.href} aria-label={item.label}>
                <item.icon className="h-5 w-5" />
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </header>
  );
}
