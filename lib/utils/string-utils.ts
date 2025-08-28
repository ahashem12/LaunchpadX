/**
 * Utility functions for string manipulation and formatting
 */

interface NameParts {
  firstName?: string | null;
  lastName?: string | null;
  email?: string;
}

/**
 * Formats a display name from name parts
 * @param nameParts Object containing firstName, lastName, and optionally email
 * @returns Formatted display name
 */
export function formatDisplayName({ firstName, lastName, email }: NameParts): string {
  if (firstName && lastName) {
    return `${firstName} ${lastName}`.trim();
  }
  if (firstName) {
    return firstName;
  }
  if (lastName) {
    return lastName;
  }
  // Fallback to email username if available
  if (email) {
    return email.split('@')[0];
  }
  return 'Anonymous';
}

/**
 * Gets initials from name parts for avatar fallback
 * @param nameParts Object containing firstName and/or lastName
 * @returns 1-2 character initials
 */
export function getInitials({ firstName, lastName }: { firstName?: string | null; lastName?: string | null }): string {
  if (firstName && lastName) {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  }
  if (firstName) {
    return firstName.slice(0, 2).toUpperCase();
  }
  if (lastName) {
    return lastName.slice(0, 2).toUpperCase();
  }
  return 'AN';
}
