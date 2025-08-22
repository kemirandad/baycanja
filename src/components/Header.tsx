'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Medal, Users, ListOrdered, BrainCircuit, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useScoresStore } from '@/store/scores-store';

export function Header() {
  const pathname = usePathname();
  const { currentJudgeId, setCurrentJudgeId } = useScoresStore();

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
        <div className="flex items-center ml-auto gap-4">
          <nav className="hidden md:flex items-center space-x-2">
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
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-muted-foreground" />
            <Select value={currentJudgeId} onValueChange={setCurrentJudgeId}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Seleccionar Juez" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="juez1">Juez 1</SelectItem>
                <SelectItem value="juez2">Juez 2</SelectItem>
                <SelectItem value="juez3">Juez 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
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
