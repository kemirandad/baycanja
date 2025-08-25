'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useScoresStore } from '@/store/scores-store';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { LogIn } from 'lucide-react';
import { users } from '@/lib/data';

const Logo = () => (
    <Image
      src="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22256%22 height=%22256%22 viewBox=%220 0 256 256%22><path fill=%22%232c528c%22 d=%22M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88%22/><path fill=%22white%22 stroke=%22%232c528c%22 stroke-width=%228%22 d=%22M128 40a88 88 0 1 0 88 88a88.1 88.1 0 0 0-88-88%22/><text x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22central%22 text-anchor=%22middle%22 font-size=%2280%22 font-family=%22sans-serif%22 fill=%22%232c528c%22>SFJ</text></svg>"
      alt="Logo"
      width={48}
      height={48}
      className="h-12 w-12"
    />
  );
  

export default function LoginPage() {
  const router = useRouter();
  const { setCurrentUser } = useScoresStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
      setError('Credenciales incorrectas. Por favor, inténtelo de nuevo.');
      return;
    }

    setError('');
    const { password: _, ...userToStore } = user;
    setCurrentUser(userToStore);
    router.push('/');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
       <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(231,72,72,0.1),transparent)]"></div></div>
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-4">
            <Logo />
          </div>
          <CardTitle className="text-3xl font-extrabold">BAYCANJA Ranks</CardTitle>
          <CardDescription className="text-lg">
            Bienvenido. Por favor, inicie sesión.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Usuario</Label>
            <Input 
              id="username" 
              placeholder="Ingrese su usuario" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input 
              id="password" 
              type="password"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>
          {error && <p className="text-sm font-medium text-destructive pt-1">{error}</p>}
        </CardContent>
        <CardFooter>
          <Button onClick={handleLogin} className="w-full text-lg py-6">
            <LogIn className="mr-2 h-5 w-5"/>
            Iniciar Sesión
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
