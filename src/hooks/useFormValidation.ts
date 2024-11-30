import { useState, useCallback } from 'react';
import { z } from 'zod';
import { get } from 'lodash';

interface ValidationState {
  errors: Record<string, string>;
  isValid: boolean;
}

export function useFormValidation<T>(schema: z.ZodSchema<T>) {
  const [validationState, setValidationState] = useState<ValidationState>({
    errors: {},
    isValid: true,
  });

  const validate = useCallback(
    (data: unknown): data is T => {
      try {
        schema.parse(data);
        setValidationState({ errors: {}, isValid: true });
        return true;
      } catch (error) {
        if (error instanceof z.ZodError) {
          const errors: Record<string, string> = {};
          error.errors.forEach((err) => {
            const path = err.path.join('.');
            errors[path] = err.message;
          });
          setValidationState({ errors, isValid: false });
        }
        return false;
      }
    },
    [schema]
  );

  const getFieldError = useCallback(
    (fieldPath: string) => {
      return get(validationState.errors, fieldPath);
    },
    [validationState.errors]
  );

  const clearErrors = useCallback(() => {
    setValidationState({ errors: {}, isValid: true });
  }, []);

  return {
    validate,
    getFieldError,
    clearErrors,
    isValid: validationState.isValid,
    errors: validationState.errors,
  };
}