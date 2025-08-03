/**
 * Secure external link utility for DeusVaultOS Website
 * Prevents tabnabbing attacks and ensures proper security attributes
 */

export const openSecureLink = (url: string): void => {
  // Open with security attributes to prevent tabnabbing
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
  
  // Additional security check
  if (newWindow) {
    newWindow.opener = null;
  }
};

export const createSecureMailto = (email: string, subject?: string): string => {
  const params = subject ? `?subject=${encodeURIComponent(subject)}` : '';
  return `mailto:${email}${params}`;
};
