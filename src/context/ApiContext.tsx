'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Guest } from '@/components/ConfirmationForm';

type ApiGuest = {
  id: number;
  name: string;
  lastName: string;
};

interface ApiContextType {
  guests: ApiGuest[];
  loading: boolean;
  error: string | null;
  fetchGuests: () => Promise<void>;
  submitGuests: (guests: Guest[]) => Promise<void>;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [guests, setGuests] = useState<ApiGuest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined in .env file");
  }
  const BASE_URL = `https://${apiUrl}`;


  const fetchGuests = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/list`);
      if (!response.ok) {
        throw new Error('Failed to fetch guests');
      }
      const data = await response.json();
      setGuests(data);
    } catch (err: any) {
      setError(err.message);
      console.error("Error fetching guests:", err);
    } finally {
      setLoading(false);
    }
  }, [BASE_URL]);

  const submitGuests = useCallback(async (newGuests: Guest[]) => {
    const response = await fetch(`${BASE_URL}/invite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newGuests),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API error response:', errorData);
        throw new Error(`Ocurrió un error: ${errorData.message || response.statusText}`);
    }
    // After successful submission, refresh the guest list
    await fetchGuests();
  }, [BASE_URL, fetchGuests]);

  return (
    <ApiContext.Provider value={{ guests, loading, error, fetchGuests, submitGuests }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};
