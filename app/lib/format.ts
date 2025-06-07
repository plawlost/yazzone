export function formatDate(dateString: string | Date) {
  if (!dateString) {
    return 'Invalid Date';
  }
  
  const date = typeof dateString === 'string' ? new Date(`${dateString}T00:00:00`) : dateString;
  
  if (!date || isNaN(date.getTime())) {
    return 'Invalid Date';
  }

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
} 