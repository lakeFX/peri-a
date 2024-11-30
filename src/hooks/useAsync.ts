import { useState, useCallback } from 'react';

interface AsyncState<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
}

export function useAsync<T>() {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    error: null,
    isLoading: false,
  });

  const execute = useCallback(async (asyncFunction: () => Promise<T>) => {
    setState({ data: null, error: null, isLoading: true });

    try {
      const result = await asyncFunction();
      setState({ data: result, error: null, isLoading: false });
      return result;
    } catch (error) {
      setState({ 
        data: null, 
        error: error instanceof Error ? error : new Error('An error occurred'), 
        isLoading: false 
      });
      throw error;
    }
  }, []);

  return { ...state, execute };
}