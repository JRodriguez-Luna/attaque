/** Monday at local midnight of the week containing `date` (defaults to now). */
export const startOfWeek = (date: Date = new Date()): Date => {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const day = d.getDay(); // 0=Sun..6=Sat
  d.setDate(d.getDate() + (day === 0 ? -6 : 1 - day));
  return d;
};

/** Seconds → "3h 05m" / "44m"-style text. */
export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.round((seconds % 3600) / 60);
  if (hours === 0) return `${minutes}m`;
  return `${hours}h ${minutes.toString().padStart(2, '0')}m`;
};

/** "Aug 23 - 29" for a week starting on `weekStart`, spanning the month if needed. */
export const formatWeekRange = (weekStart: Date): string => {
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);

  const startMonth = weekStart.toLocaleDateString('default', { month: 'short' });
  const endMonth = weekEnd.toLocaleDateString('default', { month: 'short' });

  if (startMonth === endMonth) {
    return `${startMonth} ${weekStart.getDate()} - ${weekEnd.getDate()}`;
  }
  return `${startMonth} ${weekStart.getDate()} - ${endMonth} ${weekEnd.getDate()}`;
};
