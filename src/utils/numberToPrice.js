export default function numberToPrice(number) {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(number);
}
