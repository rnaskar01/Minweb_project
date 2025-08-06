import dayjs from 'dayjs';

export async function fetchTemperature(
  lat: number,
  lon: number,
  start: string,
  end: string
): Promise<number[]> {
  const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${start}&end_date=${end}&hourly=temperature_2m`;

  const response = await fetch(url);
  const data = await response.json();

  return data.hourly.temperature_2m || [];
}
