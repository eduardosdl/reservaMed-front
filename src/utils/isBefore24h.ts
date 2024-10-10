export function isOlderThan24h(dateString: string): boolean {
  const targetDate: Date = new Date(dateString);
  const currentDate: Date = new Date();
  const timeDifference: number = currentDate.getTime() - targetDate.getTime();

  return timeDifference >= 24 * 60 * 60 * 1000;
}
