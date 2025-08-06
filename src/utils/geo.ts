export function getCentroid(coords: number[][]): [number, number] {
  let x = 0, y = 0;
  coords.forEach(([lat, lng]) => {
    x += lat;
    y += lng;
  });
  const len = coords.length;
  return [x / len, y / len];
}
