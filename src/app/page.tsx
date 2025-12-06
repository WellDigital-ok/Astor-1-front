import Image from 'next/image';
import Link from 'next/link';
import { PartyPopper } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { PartyHatIcon } from '@/components/icons';
import { cn } from '@/lib/utils';

export default function Home() {
  const invitationImage = PlaceHolderImages.find(
    (img) => img.id === 'invitation-card'
  );

  const decorativeClasses = 'text-accent/30 absolute hidden lg:block';

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background flex flex-col items-center justify-center p-4">
      {/* Decorative elements for desktop */}
      <PartyHatIcon
        className={cn(decorativeClasses, 'w-32 h-32 top-10 left-10 rotate-[30deg]')}
      />
      <PartyPopper
        className={cn(
          decorativeClasses,
          'w-24 h-24 top-20 right-20 -rotate-[20deg]'
        )}
      />
      <PartyPopper
        className={cn(
          decorativeClasses,
          'w-20 h-20 bottom-48 left-24 rotate-[10deg]'
        )}
      />
      <PartyHatIcon
        className={cn(
          decorativeClasses,
          'w-28 h-28 bottom-20 right-16 -rotate-[45deg]'
        )}
      />
      <PartyPopper
        className={cn(decorativeClasses, 'w-16 h-16 bottom-10 left-1/3 rotate-[5deg]')}
      />

      <div className="relative z-10 flex flex-col items-center gap-8 rounded-2xl bg-card/50 backdrop-blur-sm p-6 md:p-10 shadow-2xl border border-primary/20 w-full max-w-md">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-center text-foreground/80 tracking-tight">
          ¡Estás invitado!
        </h1>

        <div className="w-full max-w-xs rounded-lg overflow-hidden shadow-lg border-4 border-primary">
          {invitationImage ? (
            <Image
              src={invitationImage.imageUrl}
              alt={invitationImage.description}
              width={400}
              height={600}
              className="object-cover w-full h-auto"
              data-ai-hint={invitationImage.imageHint}
              priority
            />
          ) : (
            <div className="aspect-[2/3] w-full bg-muted flex items-center justify-center">
              <p className="text-muted-foreground">Invitation image</p>
            </div>
          )}
        </div>

        <p className="text-center text-lg text-foreground/70 font-medium">
          ¡A traer la magia!
        </p>

        <Link href="/confirm" legacyBehavior passHref>
          <Button
            asChild
            size="lg"
            className="w-full max-w-xs text-lg font-semibold rounded-full bg-accent text-accent-foreground shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
          >
            <a>Confirmar asistencia</a>
          </Button>
        </Link>
      </div>
    </main>
  );
}
