'use client';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const invitationImage = PlaceHolderImages.find(
    (img) => img.id === 'invitation-card'
  );

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background flex flex-col items-center justify-center p-4">
      <div className="relative z-10 w-full max-w-md">
        {invitationImage ? (
          <div className="relative">
            <Image
              src={invitationImage.imageUrl}
              alt={invitationImage.description}
              width={600}
              height={900}
              className="object-contain w-full h-auto"
              data-ai-hint={invitationImage.imageHint}
              priority
            />
            <Button
              asChild
              className="absolute bottom-[9.5%] left-1/2 -translate-x-1/2 w-3/4 max-w-xs bg-[#b8d5d9] text-[#555] font-semibold tracking-wider hover:bg-[#a7c3c7] rounded-full text-sm h-9"
            >
              <Link href="/confirm">CONFIRMAR ASISTENCIA</Link>
            </Button>
          </div>
        ) : (
          <div className="aspect-[2/3] w-full bg-muted flex items-center justify-center">
            <p className="text-muted-foreground">Invitation image</p>
          </div>
        )}
      </div>
    </main>
  );
}
