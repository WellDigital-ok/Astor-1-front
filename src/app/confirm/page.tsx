import { PartyPopper } from 'lucide-react';
import { ConfirmationForm } from '@/components/ConfirmationForm';
import { PartyHatIcon } from '@/components/icons';
import { cn } from '@/lib/utils';

export default function ConfirmPage() {
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

      <div className="relative z-10 w-full max-w-lg space-y-6">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground/80 tracking-tight">
            Confirmar tu asistencia
          </h1>
          <p className="mt-2 text-foreground/60">
            ¡Estamos ansiosos por celebrar contigo!
          </p>
        </div>
        <ConfirmationForm />
      </div>
    </main>
  );
}
