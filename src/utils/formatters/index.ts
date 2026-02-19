// Formatage des dates
export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', { 
    year: 'numeric', 
    month: 'long' 
  });
};

// Formatage du numéro de téléphone
export const formatPhone = (phone: string): string => {
  if (!phone) return '';
  
  // Supprime tous les caractères non numériques
  const cleaned = phone.replace(/\D/g, '');
  
  // Format français: +33 6 12 34 56 78
  if (cleaned.startsWith('33')) {
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(5, 7)} ${cleaned.slice(7, 9)} ${cleaned.slice(9, 11)}`;
  }
  
  // Format local: 06 12 34 56 78
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 4)} ${cleaned.slice(4, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8, 10)}`;
  }
  
  return phone;
};

// Formatage du nom complet
export const formatName = (name: string): string => {
  if (!name) return '';
  
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// Formatage de l'email
export const formatEmail = (email: string): string => {
  return email.toLowerCase().trim();
};

// Tronquer le texte
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

// Générer un slug à partir d'un texte
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// Formatage de la localisation
export const formatLocation = (location: { city?: string; country?: string; postalCode?: string } | string | undefined): string => {
  if (!location) return '';
  
  // Si c'est déjà une chaîne, la retourner
  if (typeof location === 'string') return location;
  
  // Si c'est un objet, formater les parties disponibles
  const parts: string[] = [];
  if (location.city) parts.push(location.city);
  if (location.postalCode) parts.push(location.postalCode);
  if (location.country) parts.push(location.country);
  
  return parts.join(', ');
};
