export function reverseArray<T = any>(array: T[]): T[] {
  return [...array].slice().reverse();
}