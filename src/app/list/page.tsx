'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, UserCheck, PartyPopper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PartyHatIcon } from '@/components/icons';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

type Guest = {
  id: number;
  name: string;
  lastName: string;
};



export default function ListPage() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const decorativeClasses = 'text-primary/30 absolute hidden lg:block';

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!apiUrl) {
          throw new Error("API_URL is not defined");
        }
        const response = await fetch(`${apiUrl}/list`);
        if (!response.ok) {
          throw new Error('Failed to fetch guests');
        }
        const data = await response.json();
        setGuests(data);
      } catch (error) {
        console.error('Error fetching guests:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGuests();

  }, []);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background flex flex-col items-center justify-center p-4">
      {/* Decorative elements */}
      <PartyHatIcon
        className={cn(decorativeClasses, 'w-32 h-32 top-10 right-10 -rotate-[30deg]')}
      />
      <PartyPopper
        className={cn(decorativeClasses, 'w-24 h-24 top-40 left-20 rotate-[20deg]')}
      />
      <PartyPopper
        className={cn(decorativeClasses, 'w-20 h-20 bottom-40 right-24 -rotate-[10deg]')}
      />
      <PartyHatIcon
        className={cn(decorativeClasses, 'w-28 h-28 bottom-20 left-16 rotate-[45deg]')}
      />
      
      <Button asChild variant="ghost" className="absolute top-4 left-4 z-20">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver
        </Link>
      </Button>

      <div className="relative z-10 w-full max-w-lg space-y-6">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground/80 tracking-tight">
            Lista de Invitados
          </h1>
          <p className="mt-2 text-foreground/60">
            ¡Qué alegría que nos acompañes!
          </p>
        </div>

        <div className="max-h-[60vh] overflow-y-auto pr-2 space-y-4">
          {loading ? (
             Array.from({ length: 5 }).map((_, index) => (
                <Card key={index} className="w-full bg-card/80 backdrop-blur-sm border-primary/30">
                    <CardContent className="p-4 flex items-center gap-4">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="space-y-2 flex-1">
                            <Skeleton className="h-4 w-3/4" />
                        </div>
                    </CardContent>
                </Card>
             ))
          ) : guests.length > 0 ? (
            guests.map((guest, index) => (
              <Card
                key={guest.id}
                className="w-full animate-in fade-in-50 slide-in-from-bottom-5 bg-card/80 backdrop-blur-sm border-primary/30"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-accent/20 text-accent flex items-center justify-center font-bold text-lg">
                    <UserCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground/90 text-lg">
                      {guest.name} {guest.lastName}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="w-full bg-card/80 backdrop-blur-sm border-primary/30">
                <CardContent className="p-6 text-center text-foreground/70">
                    <p>Aún no hay invitados confirmados. ¡Sé el primero!</p>
                </CardContent>
            </Card>
          )}
        </div>
      </div>
    </main>
  );
}
