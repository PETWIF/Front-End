export function formatNumber(value) {
  if (value >= 10000) {
    return (value / 10000).toFixed(1) + '만';
  } else if (value >= 1000) {
    return (value / 1000).toFixed(1) + '천';
  }
  return value;
}
