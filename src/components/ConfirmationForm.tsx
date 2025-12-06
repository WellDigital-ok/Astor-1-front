'use client';

import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Loader2,
  PartyPopper as PartyPopperIcon,
  PlusCircle,
  Trash2,
} from 'lucide-react';

import { submitAttendance } from '@/app/actions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

const guestSchema = z.object({
  name: z.string().min(2, { message: 'Por favor, introduce un nombre.' }),
  lastName: z.string().min(2, { message: 'Por favor, introduce un apellido.' }),
});

const formSchema = z.object({
  guests: z.array(guestSchema).min(1, 'Se requiere al menos un invitado.'),
});

type FormData = z.infer<typeof formSchema>;

export function ConfirmationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guests: [{ name: '', lastName: '' }],
    },
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'guests',
  });

  async function onSubmit(data: FormData) {
    setIsSubmitting(true);
    const result = await submitAttendance(data.guests);
    setIsSubmitting(false);

    if (result.success) {
      toast({
        title: '¡Éxito!',
        description: result.message,
      });
      setIsSuccess(true);
    } else {
      toast({
        variant: 'destructive',
        title: '¡Oh no! Algo salió mal.',
        description: result.message,
      });
    }
  }

  if (isSuccess) {
    return (
      <Card className="w-full max-w-lg animate-in fade-in-50 zoom-in-95 bg-card/80 backdrop-blur-sm border-accent">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2 text-2xl text-accent-foreground">
            <PartyPopperIcon className="h-8 w-8 text-accent" />
            ¡Gracias por confirmar!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-lg text-foreground/80">
            Hemos recibido tu confirmación. ¡Estamos muy emocionados de verte en la fiesta!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg bg-card/80 backdrop-blur-sm border-primary/30">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Información del invitado</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="max-h-[40vh] overflow-y-auto pr-2 space-y-4">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="space-y-4 rounded-lg border bg-background/50 p-4 relative animate-in fade-in-50"
                >
                  <p className="font-medium text-foreground/90">
                    Invitado {index + 1}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`guests.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre</FormLabel>
                          <FormControl>
                            <Input placeholder="Ej. Juan" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`guests.${index}.lastName`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Apellido</FormLabel>
                          <FormControl>
                            <Input placeholder="Ej. Pérez" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Eliminar invitado</span>
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="link"
              className="text-primary hover:text-primary/80 px-0"
              onClick={() => append({ name: '', lastName: '' })}
            >
              <PlusCircle className="mr-2 h-4 w-4" />+ Agregar invitado
            </Button>
            <Separator />
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
              disabled={isSubmitting}
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                'Enviar confirmación'
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
