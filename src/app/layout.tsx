import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: 'BAYCANJA Ranks',
  description: 'Plataforma de calificación para el evento BAYCANJA.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap" rel="stylesheet" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22256%22 height=%22256%22 viewBox=%220 0 256 256%22><path fill=%22%232c528c%22 d=%22M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88%22/><path fill=%22white%22 stroke=%22%232c528c%22 stroke-width=%228%22 d=%22M128 40a88 88 0 1 0 88 88a88.1 88.1 0 0 0-88-88%22/><text x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22central%22 text-anchor=%22middle%22 font-size=%2280%22 font-family=%22sans-serif%22 fill=%22%232c528c%22>SFJ</text></svg>" />
      </head>
      <body className={cn('min-h-screen bg-background font-body antialiased flex flex-col')}>
        <div className="fixed top-0 left-0 right-0 h-48 bg-gradient-to-b from-primary/10 to-transparent -z-10"></div>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
        <SpeedInsights/>
      </body>
    </html>
  );
}
