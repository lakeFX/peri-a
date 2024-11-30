import { customAlphabet } from 'nanoid';

// Create custom ID generators using a mix of numbers and uppercase letters
// Excluding similar-looking characters (0, O, 1, I, L) to avoid confusion
const alphabet = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';

// Generate a 9-character ID with prefix
export function generateId(prefix: 'P' | 'C'): string {
  const nanoid = customAlphabet(alphabet, 8);
  return `${prefix}${nanoid()}`; // e.g., P12345678 or C12345678
}

// Validate ID format
export function isValidId(id: string): boolean {
  if (!id || id.length !== 9) return false;
  const prefix = id.charAt(0);
  if (prefix !== 'P' && prefix !== 'C') return false;
  const rest = id.slice(1);
  return rest.split('').every(char => alphabet.includes(char));
}