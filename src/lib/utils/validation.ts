export const validationUtils = {
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  phone: (phone: string): boolean => {
    const phoneRegex = /^\+?[\d\s-()]{10,}$/;
    return phoneRegex.test(phone);
  },

  zipCode: (zipCode: string): boolean => {
    const zipRegex = /^\d{5}(-\d{4})?$/;
    return zipRegex.test(zipCode);
  },

  stateCode: (state: string): boolean => {
    const stateRegex = /^[A-Z]{2}$/;
    return stateRegex.test(state);
  },

  required: (value: any): boolean => {
    if (typeof value === 'string') return value.trim().length > 0;
    if (Array.isArray(value)) return value.length > 0;
    return value !== null && value !== undefined;
  }
} as const;