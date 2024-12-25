// Utility function to conditionally join class names
export function cn(...classes: string[]): string {
    return classes.filter(Boolean).join(' ');
  }
