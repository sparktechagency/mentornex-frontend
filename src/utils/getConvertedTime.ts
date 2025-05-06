export function convertTo12HourFormat(time24: string): string {
      if (!/^\d{4}$/.test(time24)) return 'Invalid time';

      const hour = parseInt(time24.slice(0, 2));
      const minute = time24.slice(2);
      const suffix = hour >= 12 ? 'PM' : 'AM';
      const formattedHour = hour % 12 === 0 ? 12 : hour % 12;

      return `${formattedHour}:${minute} ${suffix}`;
}
