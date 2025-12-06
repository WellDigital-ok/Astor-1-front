'use server';

import { z } from 'zod';

const guestSchema = z.object({
  name: z.string(),
  lastName: z.string(),
});

type Guest = z.infer<typeof guestSchema>;

export async function submitAttendance(
  guests: Guest[]
): Promise<{ success: boolean; message: string }> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ;
  if (!apiUrl) {
    console.error('API_URL environment variable is not set.');
    return {
      success: false,
      message: 'Error de configuración del servidor. Por favor, inténtalo de nuevo más tarde.',
    };
  }

  try {
    const response = await fetch(`${apiUrl}/invite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(guests),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        message: `Ocurrió un error: ${errorData.message || response.statusText}`,
      };
    }

    return {
      success: true,
      message: '¡Confirmación enviada con éxito! ¡Gracias!',
    };
  } catch (error) {
    console.error('Submission error:', error);
    return {
      success: false,
      message:
        'No se pudo conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.',
    };
  }
}
