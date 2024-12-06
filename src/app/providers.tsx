'use client'
import { useEffect } from 'react';
import { useFormStore } from '../store/useFormStore';

export function Providers({ children }: { children: React.ReactNode }) {
  const resetBuilderState = useFormStore((state) => state.resetBuilderState);

  useEffect(() => {
    // Reset builder state when navigating between pages
    return () => {
      resetBuilderState();
    };
  }, [resetBuilderState]);

  return <>{children}</>;
} 