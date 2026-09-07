import { Chart } from 'chart.js/auto';
import { useEffect, useRef } from 'react';
import type { Ride } from '../../types';
import { startOfWeek, formatDuration } from '../../lib/date';

type DayStatus = 'ridden' | 'rest' | 'today' | 'upcoming';

type DayBucket = {
  status: DayStatus;
  distance: number;
  rides: Ride[];
};

const REST_STUB = 1;
const LIME = '#95F98A';
const REST_COLOR = '#3D2464';
const UPCOMING_COLOR = 'rgba(61, 36, 100, 0.4)';

// Buckets `rides` into 7 Mon-Sun slots for the week starting `weekStart`,
// classifying each day against `today`. A day with a ride is always
// 'ridden', even if that day is today - the 'today' status only applies
// while today has no ride logged yet.
const bucketRidesByWeek = (
  rides: Ride[],
  weekStart: Date,
  today: Date = new Date(),
): DayBucket[] => {
  const todayStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  const buckets: DayBucket[] = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(weekStart);
    day.setDate(day.getDate() + i);

    let status: DayStatus = 'rest';
    if (day.getTime() === todayStart.getTime()) status = 'today';
    else if (day.getTime() > todayStart.getTime()) status = 'upcoming';

    return { status, distance: 0, rides: [] };  //  Default day
  });

  for (const ride of rides) {
    const rd = new Date(ride.ride_date);
    const rideDay = new Date(rd.getFullYear(), rd.getMonth(), rd.getDate());
    const offset = Math.round(
      (rideDay.getTime() - weekStart.getTime()) / 86_400_000,
    );
    if (offset < 0 || offset > 6) continue;

    buckets[offset].distance += Number(ride.distance);
    buckets[offset].rides.push(ride);
    buckets[offset].status = 'ridden';
  }

  return buckets;
};

export const WeeklyChart = ({ rides }: { rides: Ride[] }) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const buckets = bucketRidesByWeek(rides, startOfWeek());

    const data = buckets.map((b) =>
      b.status === 'ridden' ? b.distance : REST_STUB,
    );
    const backgroundColor = buckets.map((b) => {
      if (b.status === 'ridden') return LIME;
      if (b.status === 'upcoming') return UPCOMING_COLOR;
      return REST_COLOR;
    });
    const borderColor = buckets.map((b) =>
      b.status === 'today' ? LIME : 'transparent',
    );
    const borderWidth = buckets.map((b) => (b.status === 'today' ? 2 : 0));

    const chart = new Chart(ref.current, {
      type: 'bar',
      // Data from user
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: '',
            data,
            backgroundColor,
            borderColor,
            borderWidth,
          },
        ],
      },
      // Modify Chart text and others
      options: {
        indexAxis: 'y',
        plugins: {
          legend: { display: false },
          // Modified Hover box
          tooltip: {
            displayColors: false,
            backgroundColor: '#1A0B2E',
            titleColor: '#fff',
            bodyColor: '#A99BC4',
            padding: 10,
            cornerRadius: 8,
            callbacks: {
              label: (ctx) => {
                const bucket = buckets[ctx.dataIndex];

                if (bucket.status === 'ridden') {
                  const seconds = bucket.rides.reduce(
                    (sum, r) => sum + (r.duration_seconds ?? 0),
                    0,
                  );
                  const avgPower = Math.round(
                    bucket.rides.reduce((sum, r) => sum + r.avg_power, 0) /
                      bucket.rides.length,
                  );
                  return [
                    `${bucket.distance.toFixed(1)} mi`,
                    formatDuration(seconds),
                    `${avgPower} W`,
                  ];
                }
                if (bucket.status === 'today') return ['Today', 'No ride yet'];
                if (bucket.status === 'upcoming') return ['Upcoming'];
                return ['Rest day'];
              },
            },
          },
        },
        // X and Y Axis modification
        scales: {
          x: {
            ticks: { color: '#B6AED4' },
            grid: { display: false },
            border: { display: false },
            display: false,
          },
          y: {
            ticks: { color: '#B6AED4' },
            grid: { display: false },
            border: { display: false },
          },
        },
      },
    });
    return () => chart.destroy();
  }, [rides]);

  return (
    // Bar chart / Mon - Sun
    <div>
      <canvas ref={ref} />
    </div>
  );
};
