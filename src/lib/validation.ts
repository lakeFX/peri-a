import { FILE_UPLOAD_TYPES, MAX_FILE_SIZE } from './constants';

export function validateFile(file: File, types: keyof typeof FILE_UPLOAD_TYPES): boolean {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB`);
  }

  if (!FILE_UPLOAD_TYPES[types].includes(file.type)) {
    throw new Error(`Invalid file type. Allowed types: ${FILE_UPLOAD_TYPES[types].join(', ')}`);
  }

  return true;
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s-()]{10,}$/;
  return phoneRegex.test(phone);
}