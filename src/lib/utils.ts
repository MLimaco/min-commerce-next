/**
 * Formatea el tiempo de entrega a un formato más amigable
 * @param deliveryTime Tiempo de entrega original (ej: "24 hrs", "2 días")
 * @returns Texto formateado ("hoy", "mañana", "pronto")
 */
export function formatDeliveryTime(deliveryTime: string): string {
  // Adaptamos diferentes formatos como "24 hrs", "2 días", etc.
  if (deliveryTime.includes('hrs') || deliveryTime.includes('hr')) {
    return 'hoy';
  } else if (deliveryTime.includes('día') || deliveryTime.includes('dias')) {
    return 'mañana';
  } else {
    return 'pronto';
  }
}
