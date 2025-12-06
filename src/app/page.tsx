'use client';
import Image from 'next/image';
import Link from 'next/link';
import { PartyPopper } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { PartyHatIcon } from '@/components/icons';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

export default function Home() {
  const invitationImage = PlaceHolderImages.find(
    (img) => img.id === 'invitation-card'
  );
  const decorativeClasses = 'text-primary/30 absolute hidden lg:block';

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

      <div className="relative z-10 w-full max-w-md">
        {invitationImage ? (
          <div className="relative">
            <Image
              src={invitationImage.imageUrl}
              alt={invitationImage.description}
              width={600}
              height={900}
              className="object-contain w-full h-auto rounded-lg shadow-2xl"
              data-ai-hint={invitationImage.imageHint}
              priority
            />
            <Button
              asChild
              className="absolute bottom-[10.5%] left-1/2 -translate-x-1/2 w-3/4 max-w-xs bg-[#b8d5d9] text-[#555] font-semibold tracking-wider hover:bg-[#a7c3c7] rounded-full text-sm h-9"
            >
              <Link href="/confirm">CONFIRMAR ASISTENCIA</Link>
            </Button>
          </div>
        ) : (
          <div className="aspect-[2/3] w-full bg-muted flex items-center justify-center rounded-lg">
            <p className="text-muted-foreground">Invitation image not found</p>
          </div>
        )}
      </div>
    </main>
  );
}
